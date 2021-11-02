import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Logo, Form, FormTitle } from './styles';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Dashboard Financeiro" />
                <h2>Dashboard Financeiro</h2>
            </Logo>

            <Form onSubmit={() => { }}>
                <FormTitle>Entrar</FormTitle>
                <Input
                    type="email"
                    required
                    placeholder="e-mail"
                />
                <Input
                    required
                    type="password"
                    placeholder="senha"
                />

                <Button
                    type="submit"
                >
                    Acessar
                </Button>
            </Form>
        </Container>
    )
}

export default SignIn;