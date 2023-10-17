import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthToken } from '../authToken';

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

const Login = () => {
	const navigate = useNavigate();

	const { login } = useContext(AuthToken);
	const handlerLoginBtn = () => {
		login('data');
		navigate('/');
	};
	return (
		<WrapperStyled>
			<FormStyled>
				<TitleStyled>Đăng nhập</TitleStyled>
				<InputGroupStyled className="mb-3" controlId="username">
					<Form.Label>Tên đăng nhập</Form.Label>
					<Form.Control autoFocus />
				</InputGroupStyled>
				<InputGroupStyled className="mb-3" controlId="password">
					<Form.Label>Mật khẩu</Form.Label>
					<Form.Control type="password" autoFocus />
				</InputGroupStyled>
				<ButtonStyled variant="light" onClick={handlerLoginBtn}>
					Đăng nhập
				</ButtonStyled>
			</FormStyled>
		</WrapperStyled>
	);
};

export default Login;
