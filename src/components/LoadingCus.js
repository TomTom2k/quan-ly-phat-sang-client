import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoadingStyled = styled.div`
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(2px);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LoadingCus = ({ children, ...props }) => {
	return (
		<LoadingStyled>
			<Spinner {...props}>{children}</Spinner>
		</LoadingStyled>
	);
};

export default LoadingCus;
