import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

const InnerStyled = styled.div`
	min-height: calc(100vh - 100px);
`;

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<InnerStyled>{children}</InnerStyled>
			<Footer />
		</>
	);
};

export default Layout;
