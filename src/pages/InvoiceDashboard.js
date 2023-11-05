import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'w3-css/w3.css';
import styled from 'styled-components';
import { images } from '../assets';

const ConsumeDashboardStyle = styled.div``;
const BannerImgID = styled.div`
	position: relative;
	height: 7.5rem;
	width: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.5);
	}
	p {
		position: absolute;
		bottom: 0;
		color: white;
		align-items: center;
		font-size: 2.2rem;
		text-align: center;
		letter-spacing: 2px;
		font-weight: 700;
		line-height: 2.5;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10rem;
		margin: 0;
	}
`;
const TitleStyled = styled.h3`
	margin: 0;
	width: 30%;
	padding: 2rem 0;
	color: var(--primary);
	font-size: 1.6rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.56;
`;
const FooterStyle = styled.div`
	width: 100%;
	font-size: 0.8rem;
	font-weight: 400;
	color: rgba(33, 33, 33, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 1rem;
`;

const ConsumeDashboard = () => {
	const diaPhuongRef = useRef(null);
	const khuVucRef = useRef(null);
	const tramRef = useRef(null);
	const timeStartRef = useRef(null);
	const timeEndRef = useRef(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			timeStart: timeStartRef.current.value,
			timeEnd: timeEndRef.current.value,
			diaPhuong: diaPhuongRef.current.value,
			khuVuc: khuVucRef.current.value,
			tram: tramRef.current.value,
		};
		console.log(data);
	};
	return (
		<ConsumeDashboardStyle>
			<BannerImgID>
				<img src={images.bgData2} alt=""></img>
				<p>Tiêu thụ</p>
			</BannerImgID>
			<Container fluid="md" className="mt-5">
				<Row>
					<Col>
						<Form onSubmit={handleSubmit}>
							<TitleStyled>Thời gian truy cập</TitleStyled>
							<Row>
								<Col md={2}>
									<b>Thời gian bắt đầu</b>
									<Form.Control
										type="date"
										className="mt-2"
										ref={timeStartRef}
									></Form.Control>
								</Col>
								<Col md={{ span: 2, offset: 5 }}>
									<b>Thời gian kết thúc</b>
									<Form.Control
										type="date"
										className="mt-2"
										ref={timeEndRef}
									></Form.Control>
								</Col>
							</Row>
							<TitleStyled className="mt-5">
								Khu vực truy cập
							</TitleStyled>
							<Row className="justify-content-md">
								<Col xs lg="5">
									<Form.Select
										aria-label="Default select example"
										ref={diaPhuongRef}
									>
										<option>Địa phương</option>
										<option value="1">Cần Thơ</option>
										<option value="2">Đà Nẵng</option>
										<option value="3">Nha Trang</option>
										<option value="3">
											Thành phố Hồ Chí Minh
										</option>
									</Form.Select>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col md={5}>
									<Form.Select
										aria-label="Default select example"
										ref={khuVucRef}
									>
										<option>Khu vực</option>
										<option value="1">TẤT CẢ</option>
										<option value="2">Khu vực Bắc</option>
										<option value="3">Khu vực Nam</option>
									</Form.Select>
								</Col>
								<Col md={{ span: 5, offset: 2 }}>
									<Form.Select
										aria-label="Default select example"
										ref={tramRef}
									>
										<option>Trạm</option>
										<option value="1">TẤT CẢ</option>
										<option value="2">Trạm 1</option>
										<option value="3">Trạm 2</option>
										<option value="4">Trạm 3</option>
										<option value="5">Trạm 4</option>
									</Form.Select>
								</Col>
							</Row>
							<Row className="justify-content-end border-top mt-5">
								<Col md={2}>
									<Button
										variant="primary"
										type="submit"
										className="mt-5 w-100"
									>
										Truy cập
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Container>
			<FooterStyle>
				<p>
					Bản quyền © 2023 thuộc về Trường Đại Học Kiến Trúc Thành phố
					Hồ Chí Minh
				</p>
			</FooterStyle>
		</ConsumeDashboardStyle>
	);
};

export default ConsumeDashboard;
