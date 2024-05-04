import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { images } from '../../assets';
import { useContext } from 'react';
import { AuthToken } from '../../authToken';
import route from '../../configs/route';

const HeaderStyled = styled(Navbar)`
	background-color: #fff !important;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	height: 90px;
	z-index: 100000000000000000000;
	box-shadow: 7px 2px 5px #00000029;
`;

const LogoStyled = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	p {
		margin-bottom: 0;
		font-size: 1.25rem;
		font-weight: 700;
		margin-left: 5px;
		color: #1F5700;
	}
	img {
		width: 3rem;
		margin-right: 6px;
	}
`;

const NavStyled = styled(Navbar.Collapse)`
	justify-content: end;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(8px);
	.nav-link {
		color: #1F5700;
		font-weight: 600;
		font-size: 1.1rem;
		margin-left: 1rem;
		border-radius: 4px;

		&.active {
			font-weight: 600;
			border-bottom: 4px solid var(--primary);
			border-radius: 0;
			color:#1F5700;
		}
	}
	.nav-link:hover {
		background-color: var(--primary);
		color: #fff;
		border-radius: 4px;
	}
`;

const LinkStyled = styled(Link)`
	text-decoration: none;
	color: var(--bs-nav-link-color);
`;

const Header = () => {
	let { user, role, logout } = useContext(AuthToken);
	const [expanded, setExpanded] = useState(false);
	let navigate = useNavigate();
	const location = useLocation();

	const closeNavbar = () => setExpanded(false);

	return (
		<HeaderStyled
			expand="lg"
			className="bg-body-tertiary"
			expanded={expanded}
		>
			<Container>
				<LogoStyled href="#">
					<img src={images.logoBo} alt="#" />
					<p> QUẢN LÝ CHIẾU SÁNG</p>
				</LogoStyled>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					onClick={() => setExpanded(!expanded)}
				/>
				<NavStyled id="basic-navbar-nav">
					<Nav>
						<Nav.Link
							as={LinkStyled}
							to={route.home}
							onClick={closeNavbar}
							className={location.pathname === route.home ? "active" : ""}
						>
							TRANG CHỦ
						</Nav.Link>
						{!user ? (
							<Nav.Link
								as={LinkStyled}
								to={route.login}
								onClick={closeNavbar}
								className={location.pathname === route.login ? "active" : ""}
							>
								ĐĂNG NHẬP
							</Nav.Link>
						) : (
							<>
								{!role && (
									<NavDropdown title="CẬP NHẬT" id="update" 
										as={LinkStyled}
										to={route.update}
										onClick={closeNavbar}
										className={location.pathname === route.update ? "active" : ""}>
									<NavDropdown.Item
										onClick={() => {
											navigate(route.updateConsume);
										}}
										href={route.updateConsume}
										as={LinkStyled}
									>
										Dữ liệu điện năng tiêu thụ
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={() => {
											navigate(route.updateDevice);
										}}
										href={route.updateDevice}
										as={LinkStyled}
									>
										Dữ liệu thiết bị chiếu sáng
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={() => {
										}}
									>
										Upload file pdf
									</NavDropdown.Item>
								</NavDropdown>
								)}
								<NavDropdown title="KHAI THÁC" id="account"
									as={LinkStyled}
									to={route.chart}
									onClick={closeNavbar}
									className={location.pathname === route.chart ? "active" : ""}>
									
									<NavDropdown.Item
										onClick={() => {
											navigate(route.chart);
										}}
										href={route.chart}
										as={LinkStyled}
									>
										Tổng quan điện năng và thành tiền
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={() => {
											navigate(route.chart);
										}}
										href={route.chart}
										as={LinkStyled}
									>
										Điện năng tiêu thụ
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={() => {
											navigate(route.chart);
										}}
										href={route.chart}
										as={LinkStyled}
									>
										Thành tiền sử dụng qua thời gian
									</NavDropdown.Item>
									<NavDropdown.Item
										onClick={() => {
											navigate(route.chart);
										}}
										href={route.chart}
										as={LinkStyled}
									>
										Thiết bị
									</NavDropdown.Item>
								</NavDropdown>
								<Nav.Link
									as={LinkStyled}
									to={route.visual}
									onClick={closeNavbar}
									className={location.pathname === route.visual ? "active" : ""}
								>
									SO SÁNH
								</Nav.Link>
								<NavDropdown title="TÀI KHOẢN" id="account">
									<NavDropdown.Item
										onClick={() => {
											logout();
											navigate(route.login);
											closeNavbar();
										}}
										href={route.login}
										as={LinkStyled}
									>
										Đăng xuất
									</NavDropdown.Item>
								</NavDropdown>
							</>
						)}
					</Nav>
				</NavStyled>
			</Container>
		</HeaderStyled>
	);
};

export default Header;
