import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
	height: 40px;
	width: 100%;
	font-size: 0.8rem;
	font-weight: 400;
	color: rgba(33, 33, 33, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
`;

const Footer = () => {
	return (
		<FooterStyle>
			<p>
				Bản quyền © 2024 thuộc về câu lạc bộ Programming Lab H3.2 Trường Đại học thành phố Hồ Chí Minh
			</p>
		</FooterStyle>
	);
};

export default Footer;
