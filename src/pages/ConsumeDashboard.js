import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'w3-css/w3.css';
import styled from 'styled-components';
import { images } from '../assets';

const ConsumeDashboardStyle = styled.div``;
const BannerImgCD = styled.div`
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
}`;
const BodyStylesCD = styled.div`
	width: 100%;
`;
const TextStyleCD = styled.div`
  h3 {
    margin: 0;
    width: 30%;
    padding: 2rem 0;
    color: #0b5394;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.56;
  }
  span {
    display: flex;
    vertical-align: middle;
    width: 100%;
    padding: 2rem 0;
  }
  div {
    width: 33.3333333333%;
    p {
      font-size: 1.1rem;
      font-weight: 700;
      color: #434343;
    }
	form {
		padding: 3rem 0;
		width: 41.6666666667%;
	}
	content {
		display: flex;
		justify-content: space-between;
		select {
		width: 100%;
		height: 100%;
		margin-top: 0;
		margin-bottom: 0;
		max-width: 1280px;
		padding: 14px 8px;
    }
}`;

const BorderStyleCD = styled.div`
	border-bottom: 1px solid rgb(192 192 192);
`;
const ButtonStyle = styled(Button)`
	width: 100%;
	margin-top: 2.4rem;
	margin-bottom: 4rem;
	a {
		margin: 0;
		padding: 0.5rem 3rem;
		width: 100%;
		text-decoration: none;
	}
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
	return (
		<ConsumeDashboardStyle>
			<BannerImgCD>
				<img src={images.bgData} alt=""></img>
				<p>Tiêu thụ</p>
			</BannerImgCD>
			<BodyStylesCD>
				<Container fluid="md">
					<Row className="justify-content-md-center">
						<Col lg="11">
							<TextStyleCD>
								<h3>Thời gian truy cập dữ liệu</h3>
								<span>
									<div>
										<p>Thời gian bắt đầu</p>
										<input type="date"></input>
									</div>
									<div>
										<p>Thời gian kết thúc</p>
										<input type="date"></input>
									</div>
								</span>
							</TextStyleCD>

							<TextStyleCD>
								<h3>Khu vực truy cập dữ liệu</h3>
								<form>
									<select class="w3-select" name="option">
										<option value="" disabled selected>
											Địa phương
										</option>
										<option value="1">Cần Thơ</option>
										<option value="2">Đà Nẵng</option>
										<option value="3">Nha Trang</option>
										<option value="4">
											Thành phố Hồ Chí Minh
										</option>
									</select>
								</form>
								<content>
									<form>
										<select class="w3-select" name="option">
											<option value="" disabled selected>
												Khu vực
											</option>
											<option value="1">TẤT CẢ</option>
											<option value="2">
												Khu vực Bắc
											</option>
											<option value="3">
												Khu vực Nam
											</option>
										</select>
									</form>
									<form>
										<select class="w3-select" name="option">
											<option value="" disabled selected>
												Trạm
											</option>
											<option value="1">TẤT CẢ</option>
											<option value="2">Trạm 1</option>
											<option value="3">Trạm 2</option>
											<option value="4">Trạm 3</option>
										</select>
									</form>
								</content>
							</TextStyleCD>
							<BorderStyleCD></BorderStyleCD>
							<Row className="justify-content-end">
								<Col xs lg="2">
									<ButtonStyle variant="danger">
										<a href="#">Truy cập</a>
									</ButtonStyle>{' '}
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</BodyStylesCD>
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
