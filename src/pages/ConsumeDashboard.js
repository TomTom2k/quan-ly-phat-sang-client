import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'w3-css/w3.css';
import styled from 'styled-components';
import { images } from '../assets';
import {
	ComposedChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	Bar,
	Line,
	Area,
	Label,
	RadialBar,
	RadialBarChart,
	PieChart,
	Pie,
	Cell,
} from 'recharts';
const ConsumeDashboardStyle = styled.div`
    .form-control {
        cursor: pointer;
    }
    .form-control:hover {
        #f9fdf9
    }
    .form-select {
        cursor: pointer;
    }
    .form-select:hover {
        #f9fdf9
    }
`;
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
const TitleStyled = styled.h3`
	margin: 0;
	width: 30%;
	padding: 2rem 0;
	color: #0b5394;
	font-size: 1.6rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.56;
`;
const ButtonStyle = styled(Button)`
	width: 100%;
	margin-top: 2.4rem;
	margin-bottom: 4rem;
	a {
		margin: 0;
		color: #fff;
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

const data = [
	{
		name: 'Tháng 1',
		'Tiền điện': 1000,
		'Điện năng tiêu thụ': 2400,
	},
	{
		name: 'Tháng 2',
		'Tiền điện': 3000,
		'Điện năng tiêu thụ': 1398,
	},
	{
		name: 'Tháng 3',
		'Tiền điện': 2000,
		'Điện năng tiêu thụ': 9800,
	},
	{
		name: 'Tháng 4',
		'Tiền điện': 2780,
		'Điện năng tiêu thụ': 3908,
	},
	{
		name: 'Tháng 5',
		'Tiền điện': 1890,
		'Điện năng tiêu thụ': 4800,
	},
	{
		name: 'Tháng 6',
		'Tiền điện': 2390,
		'Điện năng tiêu thụ': 3800,
	},
	{
		name: 'Tháng 7',
		'Tiền điện': 3490,
		'Điện năng tiêu thụ': 4300,
	},
	{
		name: 'Tháng 8',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 9',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 10',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 11',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 12',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
];
const data2 = [
	{
		name: 'Trạm 1',
		'Độ biến thiên': 1000,
		'Điện năng tiêu thụ': 1000,
	},
	{
		name: 'Trạm 2',
		'Độ biến thiên': 3000,
		'Điện năng tiêu thụ': 3000,
	},
	{
		name: 'Trạm 3',
		'Độ biến thiên': 2000,
		'Điện năng tiêu thụ': 2000,
	},
	{
		name: 'Trạm 4',
		'Độ biến thiên': 2780,
		'Điện năng tiêu thụ': 2780,
	},
	{
		name: 'Trạm 5',
		'Độ biến thiên': 1890,
		'Điện năng tiêu thụ': 1890,
	},
	{
		name: 'Trạm 6',
		'Độ biến thiên': 2390,
		'Điện năng tiêu thụ': 2390,
	},
	{
		name: 'Trạm 7',
		'Độ biến thiên': 3490,
		'Điện năng tiêu thụ': 3490,
	},
];
const data3 = [
	{
		name: 'Trạm 1',
		'Điện năng tiêu thụ(Kwh)': 1000,
		fill: '#8884d8',
	},
	{
		name: 'Trạm 2',
		'Điện năng tiêu thụ(Kwh)': 900,
		fill: '#83a6ed',
	},
	{
		name: 'Trạm 3',
		'Điện năng tiêu thụ(Kwh)': 1700,
		fill: '#8dd1e1',
	},
	{
		name: 'Trạm 4',
		'Điện năng tiêu thụ(Kwh)': 1300,
		fill: '#82ca9d',
	},
	{
		name: 'Trạm 5',
		'Điện năng tiêu thụ(Kwh)': 2000,
		fill: '#a4de6c',
	},
	{
		name: 'Trạm 6',
		'Điện năng tiêu thụ(Kwh)': 1700,
		fill: '#d0ed57',
	},
	{
		name: 'Trạm 7',
		'Điện năng tiêu thụ(Kwh)': 800,
		fill: '#ffc658',
	},
];
const data4 = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const data5 = [
	{
		name: 'Group A',
		value: 400,
	},
	{
		name: 'Group B',
		value: 300,
	},
	{
		name: 'Group C',
		value: 500,
	},
	{
		name: 'Group D',
		value: 200,
	},
	{
		name: 'Group E',
		value: 278,
	},
	{
		name: 'Group F',
		value: 189,
	},
];

const ConsumeDashboard = () => {
	const diaPhuongRef = useRef(null);
	const khuVucRef = useRef(null);
	const tramRef = useRef(null);
	const timeStartRef = useRef(null);
	const timeEndRef = useRef(null);

	const [selectedFile, setSelectedFile] = useState(null);
	const [showError, setShowError] = useState(false);

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
			<BannerImgCD>
				<img src={images.bgData} alt=""></img>
				<p>Tiêu thụ</p>
			</BannerImgCD>
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
									<ButtonStyle
										variant="danger"
										type="submit"
										className="mt-5"
									>
										Truy cập
									</ButtonStyle>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
				<Row>
					<Col lg={8}>
						<ComposedChart width={830} height={300} data={data}>
							<XAxis dataKey="name" fontSize={10}>
								<Label
									value="Biểu đồ thể hiện lượng điện năng tiêu thụ và tổng tiền"
									offset={-3}
									position="insideBottom"
								/>
							</XAxis>
							<YAxis
								type="number"
								fontSize={10}
								domain={[0, 'dataMax + 1000']}
								label={{
									value: 'Điện năng(Kwh)',
									angle: -90,
									position: 'insideLeft',
									textAnchor: 'middle',
								}}
							/>
							<YAxis
								yAxisId="right"
								fontSize={10}
								orientation="right"
								domain={[0, 'dataMax + 1000']}
								label={{
									value: 'Tổng tiền(Triệu đồng)',
									angle: -90,
									position: 'insideRight',
									textAnchor: 'middle',
								}}
							/>
							<Tooltip />
							<Legend verticalAlign="top" height={36} />
							<CartesianGrid stroke="#f5f5f5" />
							<Bar
								dataKey="Điện năng tiêu thụ"
								barSize={30}
								fill="#413ea0"
							/>
							<Line
								yAxisId="right"
								type="monotone"
								dataKey="Tiền điện"
								stroke="#ff7300"
							/>
						</ComposedChart>
					</Col>
					<Col lg={4}></Col>
					<Col lg={12}>
						<ComposedChart width={730} height={300} data={data2}>
							<XAxis dataKey="name" fontSize={10}>
								<Label
									value="Biểu đồ thể hiện lượng điện năng tiêu thụ và độ biến thiên"
									offset={-3}
									position="insideBottom"
								/>
							</XAxis>
							<YAxis
								type="number"
								fontSize={10}
								domain={[0, 'dataMax + 1000']}
								label={{
									value: 'Điện năng(Kwh)',
									angle: -90,
									position: 'insideLeft',
								}}
							/>
							<Tooltip />
							<Legend verticalAlign="top" height={36} />
							<CartesianGrid stroke="#f5f5f5" />
							<Bar
								dataKey="Điện năng tiêu thụ"
								barSize={30}
								fill="#413ea0"
							/>
							<Line
								type="monotone"
								dataKey="Độ biến thiên"
								stroke="#ff7300"
							/>
						</ComposedChart>
					</Col>
					<Col lg={12}>
						<RadialBarChart
							width={730}
							height={300}
							innerRadius="20%"
							outerRadius="100%"
							data={data3}
							startAngle={540}
							endAngle={0}
						>
							<RadialBar
								minAngle={15}
								type="number"
								domain={['0,dataMax + 1000']}
								label={{
									fill: '#666',
									position: 'insideStart',
								}}
								background
								clockWise={true}
								dataKey="Điện năng tiêu thụ(Kwh)"
							/>
							<Legend
								iconSize={10}
								width={120}
								height={140}
								layout="vertical"
								verticalAlign="middle"
								align="right"
							/>
							<Tooltip />
						</RadialBarChart>
					</Col>
					<Col lg={12}>
						<ComposedChart width={730} height={300} data={data4}>
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<CartesianGrid stroke="#f5f5f5" />
							<Area
								type="monotone"
								dataKey="amt"
								fill="#8884d8"
								stroke="#8884d8"
							/>
							<Bar dataKey="pv" barSize={30} fill="#413ea0" />
							<Line
								type="monotone"
								dataKey="uv"
								stroke="#ff7300"
							/>
						</ComposedChart>
					</Col>
					<Col></Col>
					<Col lg={12}>
						<PieChart width={730} height={250}>
							<Pie
								data={data5}
								cx="50%"
								cy="50%"
								outerRadius={80}
								label
							>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} />
								))}
							</Pie>
						</PieChart>
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
