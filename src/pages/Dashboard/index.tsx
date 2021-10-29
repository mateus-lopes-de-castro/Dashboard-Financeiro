import React, { useMemo, useState } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months';

import { Container } from './styles';

const Dashboard: React.FC = () =>{

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const options = [
        { value: 'Mateus', label: 'Mateus' },
        { value: 'Mateus2', label: 'Mateus2' },
        { value: 'Mateus3', label: 'Mateus3' }
    ]

    const months = useMemo(() =>{
        return listOfMonths.map((month, index) => {
            return {
                value: index +1,
                label: month
            }
        })
    },[])

    const years = useMemo(() =>{
        let uniqueYears: number[] = [];
        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year =>{
            return {
                value: year,
                label: year
            }
        })
    },[]);

    const handleMonthSelected = (month: string) =>{
        setMonthSelected(Number(month));
    }

    const handleYearSelected = (year: string) =>{
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
        </Container>
    )
}

export default Dashboard;