import React from 'react';
import { Alert } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
	0% {
		transform: translateY(-100%);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`;
const AlertStyled = styled(Alert)`
	width: 22rem;
	position: fixed;
	top: 80px;
	left: calc(50% - 11rem);
	animation: ${slideDown} 0.5s ease-out;
`;

const AlterCus = ({ children, ...props }) => {
	return <AlertStyled {...props}>{children}</AlertStyled>;
};

export default AlterCus;
