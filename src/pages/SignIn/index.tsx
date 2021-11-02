import React, { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import { Container, Logo, Form, FormTitle } from './styles';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signIn } = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Dashboard Financeiro" />
                <h2>Dashboard Financeiro</h2>
            </Logo>

            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>
                <Input
                    type="email"
                    required
                    placeholder="e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    required
                    type="password"
                    placeholder="senha"
                    onChange={(e) => setPassword(e.target.value)}
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