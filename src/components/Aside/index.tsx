import React from 'react';
import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg'
import {
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton
} from './styles';

const Aside: React.FC = () => {

    const { signOut } = useAuth();
    return (
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="Dashboard Finanças" />
                <Title>Dashboard Finanças</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>
                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    )
}

export default Aside;