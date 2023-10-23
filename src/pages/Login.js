import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { AuthToken } from '../authToken';

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

const WrapperStyled = styled.div`
	width: 100%;
	height: calc(100vh - 68px);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FormStyled = styled(Form)`
	position: relative;
	top: -34px;
	margin-top: 2rem;
	padding: 2rem;
	border-radius: 1rem;
	border: 2rem;
	width: 400px;
	background-color: var(--primary);

	display: flex;
	justify-content: center;
	align-items: stretch;
	flex-direction: column;
`;

const TitleStyled = styled.h2`
	color: #fff;
	text-align: center;
	margin-bottom: 1rem;
`;

const InputGroupStyled = styled(Form.Group)`
	label {
		color: #fff;
	}

	input {
		&:focus {
			border-color: rgba(0, 0, 0, 0.2);
			box-shadow: none;
		}
	}
`;

const ButtonStyled = styled(Button)`
	margin-top: 2rem;
`;

const AlertStyled = styled(Alert)`
	width: 22rem;
	position: fixed;
	top: 80px;
	left: calc(50% - 11rem);
	animation: ${slideDown} 0.5s ease-out;
`;

const Login = () => {
	const navigate = useNavigate();
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const [showError, setShowError] = useState(false);

	const { login } = useContext(AuthToken);
	const handlerLoginBtn = async () => {
		try {
			await login({
				user_name: usernameRef.current.value,
				password: passwordRef.current.value,
			});
			// navigate('/');
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setShowError(true);
				// Sau 1 giây, ẩn thông báo lỗi
				setTimeout(() => {
					setShowError(false);
				}, 1000);
			}
		}
	};
	return (
		<WrapperStyled>
			<FormStyled>
				<TitleStyled>Đăng nhập</TitleStyled>
				<InputGroupStyled className="mb-3" controlId="username">
					<Form.Label>Tên đăng nhập</Form.Label>
					<Form.Control autoFocus ref={usernameRef} />
				</InputGroupStyled>
				<InputGroupStyled className="mb-3" controlId="password">
					<Form.Label>Mật khẩu</Form.Label>
					<Form.Control type="password" autoFocus ref={passwordRef} />
				</InputGroupStyled>
				<ButtonStyled variant="light" onClick={handlerLoginBtn}>
					Đăng nhập
				</ButtonStyled>
			</FormStyled>
			{showError && (
				<AlertStyled variant="danger">
					Tài khoản hoặc mật khẩu không hợp lệ
				</AlertStyled>
			)}
		</WrapperStyled>
	);
};

export default Login;
