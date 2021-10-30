import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    }, [])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    }, []);

    const totalExpenses = useMemo(() =>{
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() +1;

            if(month === monthSelected && year === yearSelected){
                total+= Number(item.amount);
            }
        });

        return total;
    },[monthSelected, yearSelected])

    const totalGains = useMemo(() =>{
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() +1;

            if(month === monthSelected && year === yearSelected){
                total+= Number(item.amount);
            }
        });

        return total;
    },[monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;

    },[totalGains,totalExpenses]);

    const message = useMemo(() =>{
      return totalBalance < 0 ? {
            title: "Que triste!",
            description: "Neste mês, você gastou mais do que deveria.",
            footerText: "Verifique seus gastos e tente mudar algumas coisas desnecessárias.",
            icon: sadImg
        } :
        totalBalance === 0 ? 
        {
            title: "Ufaa!",
            description: "Neste mês, você gastou exatamente o que ganhou.",
            footerText: "Tenha cuidado, no próximo mês tente poupar seu dinheiro.",
            icon: happyImg
        } 
        :
        {
            title: "Muito bem!",
            description: "Sua carteira está positiva.",
            footerText: "Continue assim. Considere investir seu saldo.",
            icon: happyImg
        }

    },[totalBalance])

    const handleMonthSelected = (month: string) => {
        setMonthSelected(Number(month));
    }

    const handleYearSelected = (year: string) => {
        setYearSelected(Number(year));
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>
            <Content>
                <WalletBox
                    title="saldo"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"
                    color="#4E41F0" />
                <WalletBox
                    title="entradas"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                    color="#F7931B" />
                <WalletBox
                    title="saídas"
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                    color="#E44C4E" />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon} />
            </Content>
        </Container>
    )
}

export default Dashboard;