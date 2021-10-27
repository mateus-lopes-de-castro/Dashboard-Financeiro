import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectInput from '../../components/SelectInput';
import { Container, Content } from './styles';

const List: React.FC = () => {
    const options = [
        { value: 'Mateus', label: 'Mateus' },
        { value: 'Mateus2', label: 'Mateus2' },
        { value: 'Mateus3', label: 'Mateus3' }
    ]

    return (
        <Container>
            <ContentHeader title="Entradas" lineColor="#fff">
                <SelectInput options={options} />
            </ContentHeader>
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