import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { images } from '../assets';
import LoadingCus from '../components/LoadingCus';
import AlterCus from '../components/AlterCus';
import Banner from '../components/Banner';
import OptionQuery from './../layout/components/OptionQuery';

import {
	AreaChart,
	BarChart,
	BoxPlotChart,
	ComposedAndAGVChart,
	ComposedChart,
	HistogramChart,
	LineChart,
	PieChart,
	SactterChart,
	TreeMapChart,
} from '../components/charts';

const WrapperStyled = styled.div`
	position: relative;
`;

const ConsumeDashboard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<>
			<Banner image={images.bgData3} title={'Thiết bị'} />
			<WrapperStyled>
				<Container fluid="md" className="mt-5">
					<p className="h4 text-primary"> COMING SOON</p>
				</Container>
				{errorMessage && (
					<AlterCus variant="danger">{errorMessage}</AlterCus>
				)}
				{isLoading && (
					<LoadingCus animation="border" variant="secondary" />
				)}
			</WrapperStyled>
		</>
	);
};

export default ConsumeDashboard;
