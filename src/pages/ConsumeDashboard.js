import React, { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'w3-css/w3.css';
import styled from 'styled-components';

import { images } from '../assets';
import LoadingCus from '../components/LoadingCus';

import {
	ComposedChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	Bar,
	Line,
	Label,
	ResponsiveContainer,
	BarChart,
	Rectangle,
	PieChart,
	Pie,
	Cell,
	LineChart,
	ScatterChart,
	Scatter,
	Treemap,
	Area,
	ReferenceLine,
} from 'recharts';
import userApi from '../api/userApi';
import analysisApi from '../api/analysisApi';
import AlterCus from '../components/AlterCus';

const ConsumeDashboardStyle = styled.div`
	.form-control,
	.form-select {
		cursor: pointer;
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
`;
const WrapperStyled = styled.div`
	position: relative;
`;
const TitleStyled = styled.h3`
	margin: 0;
	width: 30%;
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
const averageEnergyConsumption =
	data.reduce((total, item) => total + item['Điện năng tiêu thụ'], 0) /
	data.length;

const COLORS = [
	'#33FFFF',
	'#FFCC00',
	'#FF0000',
	'#CC99FF',
	'#FF66CC',
	'#66CCCC',
	'#CCCCFF',
	'#220000',
	'#FF33CC',
	'#EEEEEE',
	'#33CC33',
	'#66FF00',
];

const data02 = [
	{ x: 'Tháng 1', y: 300, z: 200 },
	{ x: 'Tháng 2', y: 500, z: 260 },
	{ x: 'Tháng 3', y: 700, z: 400 },
	{ x: 'Tháng 4', y: 350, z: 280 },
	{ x: 'Tháng 5', y: 500, z: 500 },
	{ x: 'Tháng 6', y: 780, z: 200 },
	{ x: 'Tháng 7', y: 400, z: 200 },
	{ x: 'Tháng 8', y: 500, z: 260 },
	{ x: 'Tháng 9', y: 300, z: 400 },
	{ x: 'Tháng 10', y: 550, z: 280 },
	{ x: 'Tháng 11', y: 400, z: 500 },
	{ x: 'Tháng 12', y: 280, z: 200 },
];

const data3 = [
	{
		name: 'Tháng 1',
		children: [{ name: 'Tháng 1', size: 24593 }],
	},
	{
		name: 'Tháng 2',
		children: [{ name: 'Tháng 2', size: 8435 }],
	},
	{
		name: 'Tháng 3',
		children: [{ name: 'Tháng 3', size: 20544 }],
	},
	{
		name: 'Tháng 4',
		children: [{ name: 'Tháng 4', size: 7313 }],
	},
	{
		name: 'Tháng 5',
		children: [{ name: 'Tháng 5', size: 20859 }],
	},
	{
		name: 'Tháng 6',
		children: [{ name: 'Tháng 6', size: 100859 }],
	},
	{
		name: 'Tháng 7',
		children: [{ name: 'Tháng 7', size: 70859 }],
	},
	{
		name: 'Tháng 8',
		children: [{ name: 'Tháng 8', size: 90859 }],
	},
	{
		name: 'Tháng 9',
		children: [{ name: 'Tháng 9', size: 30859 }],
	},
	{
		name: 'Tháng 10',
		children: [{ name: 'Tháng 10', size: 90859 }],
	},
	{
		name: 'Tháng 11',
		children: [{ name: 'Tháng 11', size: 100859 }],
	},
	{
		name: 'Tháng 12',
		children: [{ name: 'Tháng 12', size: 80859 }],
	},
];

const data4 = [
	{
		name: 'Tháng 1',
		'Tiền điện': 1000,
		'Số lượng bóng đèn': 2400,
	},
	{
		name: 'Tháng 2',
		'Tiền điện': 3000,
		'Số lượng bóng đèn': 1398,
	},
	{
		name: 'Tháng 3',
		'Tiền điện': 2000,
		'Số lượng bóng đèn': 9800,
	},
	{
		name: 'Tháng 4',
		'Tiền điện': 2780,
		'Số lượng bóng đèn': 3908,
	},
	{
		name: 'Tháng 5',
		'Tiền điện': 1890,
		'Số lượng bóng đèn': 4800,
	},
	{
		name: 'Tháng 6',
		'Tiền điện': 2390,
		'Số lượng bóng đèn': 3800,
	},
	{
		name: 'Tháng 7',
		'Tiền điện': 3490,
		'Số lượng bóng đèn': 4300,
	},
	{
		name: 'Tháng 8',
		'Tiền điện': 0,
		'Số lượng bóng đèn': 0,
	},
	{
		name: 'Tháng 9',
		'Tiền điện': 0,
		'Số lượng bóng đèn': 0,
	},
	{
		name: 'Tháng 10',
		'Tiền điện': 0,
		'Số lượng bóng đèn': 0,
	},
	{
		name: 'Tháng 11',
		'Tiền điện': 0,
		'Số lượng bóng đèn': 0,
	},
	{
		name: 'Tháng 12',
		'Tiền điện': 0,
		'Số lượng bóng đèn': 0,
	},
];

const ConsumeDashboard = () => {
	const role = JSON.parse(Cookies.get('role'));
	const diaPhuongRef = useRef(null);
	const yearRef = useRef(null);
	const monthRef = useRef(null);
	const dayRef = useRef(null);

	const [listKhuVuc, setListKhuVuc] = useState([]);
	const [selectedKhuVuc, setSelectedKhuVuc] = useState('');

	const [listTram, setListTram] = useState([]);
	const [selectedTram, setSelectedTram] = useState('');

	const [dataChart, setDataChart] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		fetchListKhuVuc();
		fetchListTram();
	}, []);

	const fetchListKhuVuc = async () => {
		try {
			setIsLoading(true);
			const res = await userApi.getKhuVuc();
			setListKhuVuc(res.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const fetchListTram = async (tramId) => {
		try {
			setIsLoading(true);
			const res = await userApi.getTram(tramId);
			setListTram(res.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleChangeKhuVuc = (e) => {
		setSelectedKhuVuc(e.target.value);
		if (e.target.value !== '-1') fetchListTram(e.target.value);
		else fetchListTram();
	};

	const handlerChangeTram = (e) => {
		setSelectedKhuVuc(e.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (selectedKhuVuc) {
			setIsLoading(true);
			const data = {
				nam: yearRef.current.value,
				khuVuc: selectedKhuVuc,
				tram: selectedTram,
			};

			try {
				console.log(selectedKhuVuc);
				const res = await analysisApi.chartDienNangTieuThuThanhTien(
					data
				);
				console.log(res);
				setDataChart(res.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		} else {
			setErrorMessage('Vui lòng chọn khu vực');
			setTimeout(() => setErrorMessage(''), 1000);
		}
	};

	return (
		<ConsumeDashboardStyle>
			<BannerImgCD>
				<img src={images.bgData} alt=""></img>
				<p>Tiêu thụ</p>
			</BannerImgCD>
			<WrapperStyled>
				<Container fluid="md" className="mt-5">
					<Row>
						<Col>
							<Form onSubmit={handleSubmit}>
								<TitleStyled className="mb-2">
									Thời gian truy cập
								</TitleStyled>
								<Row className="justify-content-between">
									<Col md={3}>
										<b>Năm</b>
										<Form.Control
											type="number"
											ref={yearRef}
										></Form.Control>
									</Col>
									<Col md={3}>
										<b>Tháng</b>
										<Form.Control
											type="number"
											ref={monthRef}
										></Form.Control>
									</Col>
									<Col md={3}>
										<b>Ngày</b>
										<Form.Control
											type="number"
											ref={dayRef}
										></Form.Control>
									</Col>
								</Row>
								<TitleStyled className="mt-4 mb-2">
									Khu vực truy cập
								</TitleStyled>
								{role && (
									<Row className="justify-content-md">
										<Col xs lg="5">
											<Form.Select
												aria-label="Default select example"
												ref={diaPhuongRef}
											>
												<option hidden>
													Địa phương
												</option>
												<option value="1">
													Cần Thơ
												</option>
												<option value="2">
													Đà Nẵng
												</option>
												<option value="3">
													Nha Trang
												</option>
												<option value="3">
													Thành phố Hồ Chí Minh
												</option>
											</Form.Select>
										</Col>
									</Row>
								)}
								<Row className="mt-4">
									<Col md={5}>
										<Form.Select
											aria-label="Default select example"
											onChange={handleChangeKhuVuc}
										>
											<option hidden>Khu vực</option>
											<option value="-1">Tất cả</option>
											{listKhuVuc.map((khuvuc) => (
												<option
													key={khuvuc.khu_vuc_id}
													value={khuvuc.khu_vuc_id}
												>
													{khuvuc.ten_khu_vuc}
												</option>
											))}
										</Form.Select>
									</Col>
									<Col md={{ span: 5, offset: 2 }}>
										<Form.Select
											aria-label="Default select example"
											onChange={handlerChangeTram}
										>
											<option value="" hidden>
												Trạm
											</option>
											{listTram.map((tram) => (
												<option
													key={tram.tram_id}
													value={tram.tram_id}
												>
													{tram.ten_tram} -{' '}
													{tram.dia_chi}
												</option>
											))}
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
					{dataChart && (
						<Row>
							<Row>
								<Col lg={8}>
									<ComposedChart
										width={830}
										height={300}
										data={dataChart}
									>
										<XAxis
											dataKey="ngay_do__month"
											fontSize={10}
										></XAxis>
										<YAxis
											unit="kWh"
											type="number"
											fontSize={10}
											domain={[0, 'dataMax + 1000']}
											label={{
												value: 'Điện năng (Kwh)',
												angle: -90,
												position: 'insideLeft',
												textAnchor: 'middle',
												fontSize: 12,
											}}
										/>
										<YAxis
											unit="vnd"
											yAxisId="right"
											fontSize={10}
											orientation="right"
											domain={[0, 'dataMax + 1000']}
											label={{
												value: 'Tổng tiền (VND)',
												angle: -90,
												position: 'insideRight',
												textAnchor: 'middle',
												fontSize: 12,
											}}
										/>
										<Tooltip />
										<Legend
											verticalAlign="top"
											height={36}
										/>
										<CartesianGrid stroke="#f5f5f5" />
										<Bar
											dataKey="tong_gia_tri"
											barSize={30}
											fill="#413ea0"
										/>
										<Line
											yAxisId="right"
											type="monotone"
											dataKey="tong_thanh_tien"
											stroke="#FF3030"
										/>
									</ComposedChart>
									<Col lg={12} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ và thành tiền theo năm(Kwh)
										</p>
									</Col>
								</Col>
								<Col lg={4}></Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ResponsiveContainer
										width={800}
										height={300}
									>
										<BarChart
											width={500}
											height={300}
											data={dataChart}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 15,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="ngay_do_month">
												<Label
													value="Biểu đồ thể hiện lượng điện năng tiêu thụ và tổng tiền"
													offset={-3}
													position="insideBottom"
												/>
											</XAxis>
											<YAxis
												unit="kWh"
												type="number"
												fontSize={10}
												domain={[0, 'dataMax + 1000']}
												label={{
													value: 'Điện năng(Kwh)',
													angle: -90,
													position: 'insideLeft',
													textAnchor: 'middle',
													fontSize: 12,
												}}
											/>

											<Tooltip />
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Bar
												dataKey="tong_gia_tri"
												fill="#8884d8"
												activeBar={
													<Rectangle
														fill="pink"
														stroke="blue"
													/>
												}
											/>
											<Bar
												dataKey="tong_thanh_tien"
												fill="#82ca9d"
												activeBar={
													<Rectangle
														fill="gold"
														stroke="purple"
													/>
												}
											/>
										</BarChart>
									</ResponsiveContainer>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ResponsiveContainer
										width={750}
										height={200}
									>
										<PieChart width={400} height={400}>
											<Pie
												data={data}
												cx="50%"
												cy="50%"
												labelLine={false}
												outerRadius={100}
												fill="#8884d8"
												dataKey="Điện năng tiêu thụ"
											>
												{data.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={
															COLORS[
																index %
																	COLORS.length
															]
														}
													/>
												))}
											</Pie>
											<Tooltip />
										</PieChart>
									</ResponsiveContainer>
									<Col lg={7} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ theo tháng(Kwh)
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ResponsiveContainer
										width={850}
										height={300}
									>
										<LineChart
											width={500}
											height={300}
											data={dataChart}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 1,
											}}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="name"
												fontSize={10}
											></XAxis>
											<YAxis
												unit="kWh"
												type="number"
												fontSize={10}
												domain={[0, 'dataMax + 1000']}
												label={{
													value: 'Điện năng(Kwh)',
													angle: -90,
													position: 'left',
													textAnchor: 'middle',
													fontSize: 12,
												}}
											/>
											<Tooltip />
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Line
												type="monotone"
												dataKey="tong_gia_tri"
												stroke="#FF3030"
											/>
										</LineChart>
									</ResponsiveContainer>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ theo tháng(Kwh)
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ResponsiveContainer
										width={830}
										height={400}
									>
										<ScatterChart
											margin={{
												top: 20,
												right: 20,
												bottom: 20,
												left: 20,
											}}
										>
											<CartesianGrid />
											<XAxis dataKey="x" fontSize={10} />
											<YAxis
												unit="kWh"
												type="number"
												dataKey="y"
												name="kWh"
												stroke="#8884d8"
											/>
											<YAxis
												type="number"
												fontSize={10}
												domain={[0, 'dataMax + 1000']}
												label={{
													value: 'Điện năng(Kwh)',
													angle: -90,
													position: 'left',
													textAnchor: 'middle',
													fontSize: 12,
												}}
											/>
											<Tooltip
												cursor={{
													strokeDasharray: '3 3',
												}}
											/>
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Scatter
												name="Lượng điện năng tiêu thụ"
												data={data02}
												fill="#8884d8"
											/>
										</ScatterChart>
									</ResponsiveContainer>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ theo tháng(Kwh)
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col></Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ResponsiveContainer
										width={800}
										height={300}
									>
										<Treemap
											width={400}
											height={200}
											data={data3}
											dataKey="size"
											aspectRatio={4 / 3}
											stroke="#fff"
											fill="#8884d8"
										/>
									</ResponsiveContainer>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ theo tháng(Kwh)
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ResponsiveContainer
										width={800}
										height={300}
									>
										<ComposedChart
											data={data4}
											margin={{
												top: 20,
												right: 80,
												bottom: 20,
												left: 20,
											}}
										>
											<CartesianGrid stroke="#f5f5f5" />
											<XAxis
												dataKey="name"
												fontSize={10}
												label={{
													value: 'Tháng',
													position:
														'insideBottomRight',
													fontSize: 10,
												}}
											/>
											<YAxis
												type="number"
												fontSize={10}
												domain={[0, 'dataMax + 1000']}
												label={{
													value: 'Bóng đèn(cái)',
													angle: -90,
													position: 'insideLeft',
													textAnchor: 'middle',
													fontSize: 12,
												}}
											/>
											<Tooltip />
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Area
												type="step"
												dataKey="Số lượng bóng đèn"
												stroke="#8884d8"
												fill="#8884d8"
											/>
											<Area
												name="Mật độ bóng đèn"
												type="monotone"
												dataKey="Số lượng bóng đèn"
												stroke="#ff7300"
												fill="rgba(255, 255, 255, 0.00)"
											/>
										</ComposedChart>
									</ResponsiveContainer>
									<Col lg={8} className="text-center r-2">
										<p>
											Biểu đồ thể hiện số lượng bóng đèn
											và mật độ xuất hiện
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col>
									<ComposedChart
										width={830}
										height={300}
										data={data}
									>
										<XAxis
											dataKey="name"
											fontSize={10}
										></XAxis>
										<YAxis
											unit="kWh"
											type="number"
											fontSize={10}
											domain={[0, 'dataMax + 1000']}
											label={{
												value: 'Điện năng(Kwh)',
												angle: -90,
												position: 'insideLeft',
												textAnchor: 'middle',
												fontSize: 12,
											}}
										/>
										<YAxis
											unit="VND"
											yAxisId="right"
											fontSize={10}
											orientation="right"
											domain={[0, 'dataMax + 1000']}
											label={{
												value: 'Tổng tiền(Triệu đồng)',
												angle: -90,
												position: 'insideRight',
												textAnchor: 'middle',
												fontSize: 12,
											}}
										/>
										<Tooltip />
										<Legend
											verticalAlign="top"
											height={36}
										/>
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
											stroke="#FF3030"
										/>
										<ReferenceLine
											y={averageEnergyConsumption}
											stroke="#808080"
											label={{
												position: 'insideTopRight',
												value: `Điện năng trung bình: ${averageEnergyConsumption.toFixed(
													2
												)} kWh`,
												fontSize: 12,
											}}
										/>
									</ComposedChart>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ theo tháng(Kwh)
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col></Col>
							</Row>
						</Row>
					)}
				</Container>
				{errorMessage && (
					<AlterCus variant="danger">{errorMessage}</AlterCus>
				)}
				{isLoading && (
					<LoadingCus animation="border" variant="secondary" />
				)}
			</WrapperStyled>
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
