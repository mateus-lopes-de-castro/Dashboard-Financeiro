import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content, Filters } from './styles';

const List: React.FC = () => {
    const months = [
        { value: 7, label: 'Julho' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Setembro' }
    ]

    const years = [
        { value: 2020, label: 2020 },
        { value: 2019, label: 2019 },
        { value: 2018, label: 2018 }
    ]

    return (
        <Container>
            <ContentHeader title="Entradas" lineColor="#fff">
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button 
                type="button"
                className="tag-filter tag-filter-recurrenty">
                    Recorrentes
                </button>

                <button 
                type="button"
                className="tag-filter tag-filter-eventual">
                    Eventuais
                </button>
            </Filters>

            <Content>
                <HistoryFinanceCard
                    tagColor={'#E44C4E'}
                    title={'Conta de Luz'}
                    subtitle={'Janeiro 2020'}
                    amount={'R$ 123,32'}
                />
            </Content>
        </Container>
    )
}

export default List;