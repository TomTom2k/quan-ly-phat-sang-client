import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import styled from "styled-components";

import { images } from "../../assets";
import { useContext } from "react";
import { AuthToken } from "../../authToken";
import route from "../../configs/route";

const HeaderStyled = styled(Navbar)`
    background-color: #fff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    height: 60px;
    z-index: 100000000000000000000;
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
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
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
    let { user, role, logout } = useContext(AuthToken);
    const [expanded, setExpanded] = useState(false);
    let navigate = useNavigate();

    const closeNavbar = () => setExpanded(false);
    return (
        <HeaderStyled
            expand="lg"
            className="bg-body-tertiary"
            expanded={expanded}
        >
            <Container>
                <LogoStyled href="#">
                    <img src={images.logoUAH} alt="#" />
                    <p> Quản lý chiếu sáng</p>
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
                        >
                            Trang chủ
                        </Nav.Link>
                        {!role && (
                            <Nav.Link
                                as={LinkStyled}
                                to={route.update}
                                onClick={closeNavbar}
                            >
                                Cập nhật
                            </Nav.Link>
                        )}
                        <Nav.Link
                            as={LinkStyled}
                            to={route.chart}
                            onClick={closeNavbar}
                        >
                            Biểu đồ
                        </Nav.Link>
                        {!user ? (
                            <Nav.Link
                                as={LinkStyled}
                                to={route.login}
                                onClick={closeNavbar}
                            >
                                Đăng nhập
                            </Nav.Link>
                        ) : (
                            <NavDropdown title="Tài khoản" id="account">
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
                        )}
                    </Nav>
                </NavStyled>
            </Container>
        </HeaderStyled>
    );
};

export default Header;
