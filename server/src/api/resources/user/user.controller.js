import userService from './user.service';
import User from './user.model';
import jwt from '../../helpers/jwt';

export default {
	signup(req, res) {
		const { value, error } = userService.validateSignup(req.body);
		if (error) return res.status(400).json(error);
		const encryptedPass = userService.encryptPassword(value.password);
		User.create({
			firstName: value.firstName,
			email: value.email,
			password: encryptedPass,
		})
			.then(user => {
				const token = jwt.issue({ id: user._id }, '1d');
				return token;
			})
			.then(token => res.json({ token }))
			.catch(err => res.status(500).send(err));
	},

	login(req, res) {
		const { value, error } = userService.validateLogin(req.body);
		if (error) return res.status(400).json(error);
		User.findOne({email: value.email})
			.then((user) => {
				if (!user) {
					return res.status(401).json({ err : 'unauthorized' });
				}
				const authenticated = userService.comparePassword(value.password, user.password);
				if (!authenticated) {
					return res.status(401).json({ err: 'unauthorized' });
				}
				const token = jwt.issue({ id: user._id }, '1d');
				return res.json({ token }); 

			})
			.catch(err => console.log(err));
	},
	
	authenticate(req, res) {
		return res.json(req.user);
	}
};
