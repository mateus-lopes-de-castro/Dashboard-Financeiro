import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard: React.FC = () =>{

    const options = [
        { value: 'Mateus', label: 'Mateus' },
        { value: 'Mateus2', label: 'Mateus2' },
        { value: 'Mateus3', label: 'Mateus3' }
    ]

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#fff">
               <SelectInput options={options}/>
            </ContentHeader>
        </Container>
    )
}

export default Dashboard;