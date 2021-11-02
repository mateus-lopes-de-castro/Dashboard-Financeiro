import React from 'react';

import logoImg from '../../assets/logo.svg';

import { Container, Logo, Form, FormTitle } from './styles';

const SignIn: React.FC = () =>{
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Dashboard Financeiro" />
                <h2>Dashboard Financeiro</h2>
            </Logo>

            <Form>
                <FormTitle>Entrar</FormTitle>
                <input type="text"></input>
                <input type="text"></input>

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    )
}

export default SignIn;