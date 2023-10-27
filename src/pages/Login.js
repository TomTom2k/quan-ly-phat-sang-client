import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthToken } from '../authToken';
import route from '../configs/route';
import AlterCus from '../components/AlterCus';
import LoadingCus from '../components/LoadingCus';

const WrapperStyled = styled.div`
	width: 100%;
	height: calc(100vh - 68px);
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
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
	);
};

export default Login;
