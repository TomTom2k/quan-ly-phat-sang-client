import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';

const InnerStyled = styled.div`
	min-height: calc(100vh - 100px);
	margin-bottom: 20px;
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
