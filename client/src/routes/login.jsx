import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@/components/UI/button';
import Input from '@/components/UI/input';



/* Component? */
const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  min-height: 100%;
  
  >div{
    align-items: center;
    display: flex;
    flex-basis: 50%;
    justify-content: center;
    transition: all 0.5s; 
  }

  >.content-wrapper__side-b{
    background: #ff4b7d;
    color: #fff;
    font-size: 25px;
    font-weight: bold;
  }
`;
const Container = styled.div`
  text-align: center;
  font-family: 'Inter UI';
`;


/* Component? */
const Title = styled.h1`
  font-size: 42px;
`

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      email: '',
      password: '',
      token: '',
      error: false
    };
  }

  handleChange({ field, value }) {
    this.setState({
      [field]: value
    });
  }

  callApi({

    email,
    password,
  }) {
    const ctx = this;
    const body = JSON.stringify({
      email,
      password
    });
    fetch(`${__API__}users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body,
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error('Error', resp.status);
        }
        return resp.json()
      })
      .then(({ token }) => {
        ctx.setState({
          ...ctx.state,
          token,
        });
        
        localStorage.setItem('user', token);
        this.props.history.push('/');
      })
      .catch((err) => {
        throw Error('Couldn\'t fetch'.concat(err));
      });
  }

  render() {
    const { data } = Login;
    const {
      email,
      password
    } = this.state;

    return (
      <MainWrapper>
        <div className="content-wrapper content-wrapper__side-a">
          {console.log(this.state)}
          <Container>
            {
              data.map(({
                name,
                field
              }) => (
                  <Input
                    name={name}
                    key={field}
                    type={field === 'password' ? 'password' : 'text'}
                    required
                    onChange={({
                      target: {
                        value
                      }
                    }) => this.handleChange({
                      field,
                      value,
                    })}
                  />
                )
              )
            }
            <Button
              type="button"
              onClick={() => this.callApi({
                email,
                password,
              })}
            >
              Aceptar
            </Button>
            {this.state.error &&( <p>User or Password not valid</p>)}
          </Container>
        </div>

        <div className="content-wrapper content-wrapper__side-b">
          <Container>
            <Title>Login</Title>
          </Container>
        </div>
      </MainWrapper>

    );
  }
}

Login.data = [
  {
    name: 'User Mail',
    field: 'email',
  }, {
    name: 'User Password',
    field: 'password',
  }
];


export default Login;
