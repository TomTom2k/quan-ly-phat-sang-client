import React, { useContext, useRef, useState } from "react";
import { Button, Form, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthToken } from "../authToken";
import route from "../configs/route";
import AlterCus from "../components/AlterCus";
import LoadingCus from "../components/LoadingCus";
import { images } from "../assets";
import Header from "../layout/components/Header";
import styled, { keyframes } from "styled-components";
const WrapperStyled = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

`;

const FormStyled = styled(Form)`
    position: relative;
    margin-top: -1rem;
    padding: 2rem;
    border-radius: 1rem;
    border: 2rem;
    width: 400px;
    display: flex;
    align-items: stretch;
    align-content: flex-end;
    flex-direction: column;
`;

const TitleStyled = styled.h3`
    color: #fff;
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 2px #7f7f7f;
`;

const InputGroupStyled = styled(Form.Group)`
    
    label {
        color: #fff;
    }

    input {
        margin-bottom: 2rem;
        box-shadow: 6px 4px 6px #23232342;
        &:focus {
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: none;
        }
    }
`;

const ButtonStyled = styled(Button)`
    margin-top: 0rem;
    box-shadow: 6px 4px 6px #23232342;
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    width: 162px;
    &:hover{
        background-color: #fff;
        color: var(--primary);
    }
`;
const CarouselStyle = styled(Carousel)`
    
    img {
        width:100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.97);
    }
`
const moveUpDown = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
`;

const SloganStyle = styled.div`
    font-size: 48px;
    font-weight: 700;
    color: #f5f5f5;
    letter-spacing: 7px;
    width: 1000px;
    text-align: center;
    padding: 0rem 2rem 2rem 2rem;
    display: flex;
    text-shadow: 7px 3px 7px #12121273;
    animation: ${moveUpDown} 2s infinite;
`;
const GradientOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
`;
const Login = () => {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthToken);

    const handlerLoginBtn = async () => {
        try {
            setIsLoading(true);
            await login({
                user_name: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            setIsLoading(false);
            navigate(route.home);
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 1000);
            }
        }
    };

    return (
        <>
        <Header/>
            <WrapperStyled className="row">
            <SloganStyle className="col-7">CÔNG CUỘC TIẾT KIỆM NĂNG LƯỢNG QUỐC GIA</SloganStyle>
                <FormStyled className="col-5">
                    <TitleStyled>ĐĂNG NHẬP</TitleStyled>
                    <InputGroupStyled className="mb-3" controlId="username" >
                        <Form.Control autoFocus ref={usernameRef} placeholder="Tên đăng nhập"/>
                    </InputGroupStyled>
                    <InputGroupStyled className="mb-3" controlId="password" >
                        <Form.Control type="password" autoFocus ref={passwordRef} placeholder="Mật khẩu"/>
                    </InputGroupStyled>
                    <div style={{width: "100%", display: "flex",justifyContent: "center"}}>
                        <ButtonStyled variant="light" onClick={handlerLoginBtn}>
                            ĐĂNG NHẬP
                        </ButtonStyled>
                    </div>
                </FormStyled>
                {showError && (
                    <AlterCus variant="danger">
                        Tài khoản hoặc mật khẩu không hợp lệ
                    </AlterCus>
                )}
                {isLoading && (
                    <LoadingCus animation="border" variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </LoadingCus>
                )}
            </WrapperStyled>
            <CarouselStyle style={{ position: "absolute", zIndex: 1, position: "absolute", zIndex: -1,top: 0,width: "100%"}}>
            
                <Carousel.Item>
                    <img src={images.bgLogin1} alt="#" />
                    <GradientOverlay />
                    <Carousel.Caption>
                        <p>Bản quyền © 2024 thuộc về câu lạc bộ Programming Lab H3.2 Trường Đại học thành phố Hồ Chí Minh</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={images.bgLogin2} alt="#" />
                    <GradientOverlay />
                    <Carousel.Caption>
                        <p>Bản quyền © 2024 thuộc về câu lạc bộ Programming Lab H3.2 Trường Đại học thành phố Hồ Chí Minh</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={images.bgLogin3} alt="#" />
                    <GradientOverlay />
                    <Carousel.Caption>
                        <p>Bản quyền © 2024 thuộc về câu lạc bộ Programming Lab H3.2 Trường Đại học thành phố Hồ Chí Minh</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </CarouselStyle>
        </>
    );
};

export default Login;
