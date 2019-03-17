import styled from 'styled-components';


export default styled.button`
    background: linear-gradient(93deg, #d69f24, #ffe672);
    color: #333;
    text-align: center;
    border: none;
    border-radius: rem(10);
    padding: rem(10);
    min-width: rem(250);
    margin: 0 auto;
    display: block;
    font-family: 'Inter UI';


    &:hover {
      background: linear-gradient(0deg, #d69f24, #ffe672);
      cursor: pointer;
    }
    @media only screen and (max-width: 500px),
      only screen and (max-device-width: 500px) {
    }
`;
