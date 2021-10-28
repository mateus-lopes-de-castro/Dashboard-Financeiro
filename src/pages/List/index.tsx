import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid'

import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencySelected, setFrequencySelected] = useState(['recorrente', 'eventual']);

    const { type } = match.params;

    const page = useMemo(() => {
        return type === 'entry-balance' ?
            { title: 'Entradas', lineColor: '#F7931B', data: gains } :
            { title: 'Saídas', lineColor: '#E44C4E', data: expenses };
    }, [type]);

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
        page.data.forEach(item => {
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
    },[page]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencySelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
            const filtered = frequencySelected.filter(item => item !== frequency);
            setFrequencySelected(filtered);
        }else{
            setFrequencySelected((prev) => [...prev, frequency]);
        }
    }

    const handleMonthSelected = (month: string) =>{
        setMonthSelected(Number(month));
    }

    const handleYearSelected = (year: string) =>{
        setYearSelected(Number(year));
    }

    useEffect(() => {
        
        const filteredData = page.data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencySelected.includes(item.frequency);
        });

        const formattedData = filteredData.map(item =>{
            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(item.amount),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#E44C4E' : '#4E41F0'
            }
        });
        setData(formattedData);
    }, [page, monthSelected, yearSelected, frequencySelected])

    return (
        <Container>
            <ContentHeader title={page.title} lineColor={page.lineColor}>
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

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrenty ${frequencySelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}>
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual ${frequencySelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}>
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }

            </Content>
        </Container>
    )
}

export default List;