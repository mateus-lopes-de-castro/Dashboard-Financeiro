import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

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

    const totalExpenses = useMemo(() => {
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                total += Number(item.amount);
            }
        });

        return total;
    }, [monthSelected, yearSelected])

    const totalGains = useMemo(() => {
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                total += Number(item.amount);
            }
        });

        return total;
    }, [monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;

    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        return totalBalance < 0 ? {
            title: "Que triste!",
            description: "Neste mês, você gastou mais do que deveria.",
            footerText: "Verifique seus gastos e tente mudar algumas coisas desnecessárias.",
            icon: sadImg
        } :
            (totalGains === 0 && totalExpenses === 0) ?
                {
                    title: "Ops's!",
                    description: "Neste mês, não há registros de entradas e saídas.",
                    footerText: "Parece que você não fez nenhum registro no mês e ano selecionado.",
                    icon: happyImg
                }
                :
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

    }, [totalBalance, totalGains, totalExpenses])

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const gainsPercent = Number(((totalGains / total) * 100).toFixed(1));
        const expensesPercent = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: gainsPercent ? gainsPercent : 0,
                color: '#F7931B'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: expensesPercent ? expensesPercent : 0,
                color: '#E44C4E'
            },
        ];

        return data;

    }, [totalGains, totalExpenses])

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;

            gains.forEach((gain) => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    amountEntry += Number(gain.amount);
                }
            });

            let amountOutput = 0;
            expenses.forEach((expense) => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMonth === month && expenseYear === yearSelected) {
                    amountOutput += Number(expense.amount);
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput,
            }
        })
            .filter(item => {
                const currentyMonth = new Date().getMonth();
                const currentyYear = new Date().getFullYear();

                return (yearSelected === currentyYear && item.monthNumber <= currentyMonth) || (yearSelected < currentyYear)

            });
    }, [yearSelected]);

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
            .forEach((expense) => {
                if (expense.frequency === 'recorrente') {
                    return amountRecurrent += expense.amount;
                }

                if (expense.frequency === 'eventual') {
                    return amountEventual += expense.amount;
                }
            });

        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#F7931B'
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#E44C4E'
            }
        ];
    }, [monthSelected, yearSelected])

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
            .forEach((gain) => {
                if (gain.frequency === 'recorrente') {
                    return amountRecurrent += gain.amount;
                }

                if (gain.frequency === 'eventual') {
                    return amountEventual += gain.amount;
                }
            });

        const total = amountRecurrent + amountEventual;
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#F7931B'
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#E44C4E'
            }
        ];
    }, [monthSelected, yearSelected])

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

                <PieChartBox data={relationExpensesVersusGains} />

                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />

                <BarChartBox
                    title={"Saídas"}
                    data={relationExpensesRecurrentVersusEventual} />

                <BarChartBox
                    title={"Entradas"}
                    data={relationGainsRecurrentVersusEventual} />
            </Content>
        </Container>
    )
}

export default Dashboard;