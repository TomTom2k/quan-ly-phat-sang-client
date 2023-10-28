import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import styled from 'styled-components';

import { images } from '../../assets';
import { useContext } from 'react';
import { AuthToken } from '../../authToken';
import route from '../../configs/route';

const HeaderStyled = styled(Navbar)`
	background-color: #fff !important;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const LogoStyled = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	p {
		margin-bottom: 0;
		font-size: 1.25rem;
		font-weight: 600;
		margin-left: 5px;
	}
	img {
		width: 3rem;
	}
`;
const NavStyled = styled(Navbar.Collapse)`
	justify-content: end;
	.nav-link {
		color: #333;
		font-weight: 600;
		font-size: 1.225rem;
		margin-left: 1rem;

		&.active {
			font-weight: 600;
		}
	}
	.nav-link:hover {
		color: var(--primary);
	}
`;
const LinkStyled = styled(Link)`
	text-decoration: none;
	color: var(--bs-nav-link-color);
`;

const Header = () => {
	let { user, logout } = useContext(AuthToken);
	let navigate = useNavigate();

	return (
		<HeaderStyled expand="lg" className="bg-body-tertiary">
			<Container>
				<LogoStyled href="#">
					<img src={images.logoUAH} alt="#" />
					<p> Quản lý chiếu sáng</p>
				</LogoStyled>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<NavStyled id="basic-navbar-nav">
					<Nav>
						<Nav.Link as={LinkStyled} to="/">
							Trang chủ
						</Nav.Link>
						<NavDropdown title="Dữ liệu" id="data-dropdown">
							<NavDropdown.Item>
								<LinkStyled to={route.update}>
									Cập nhật dữ liệu
								</LinkStyled>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<LinkStyled to={route.consume}>
									Dữ liệu tiêu thụ
								</LinkStyled>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<LinkStyled to={route.invoice}>
									Dữ liệu hóa đơn
								</LinkStyled>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<LinkStyled to={route.device}>
									Dữ liệu thiết bị
								</LinkStyled>
							</NavDropdown.Item>
						</NavDropdown>
						{!user ? (
							<Nav.Link as={LinkStyled} to={route.login}>
								Đăng nhập
							</Nav.Link>
						) : (
							<NavDropdown title="Tài khoản" id="account">
								<NavDropdown.Item
									onClick={() => {
										logout();
										navigate(route.login);
									}}
									href={route.login}
									as={LinkStyled}
								>
									Đăng xuất
								</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</NavStyled>
			</Container>
		</HeaderStyled>
	);
};

export default Header;
