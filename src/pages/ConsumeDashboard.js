import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import 'w3-css/w3.css';
import ReactApexChart from 'react-apexcharts';
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
	AreaChart,
} from 'recharts';
import userApi from '../api/userApi';
import analysisApi from '../api/analysisApi';
import AlterCus from '../components/AlterCus';
import { AuthToken } from '../authToken';
import ConvertToTable from '../components/ConvertToTable';

const ConsumeDashboardStyle = styled.div`
	.form-control,
	.form-select {
		cursor: pointer;
	}
`;
const BannerImgCD = styled.div`
	position: relative;
	height: 12rem;
	width: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
	'#87CEEB',
	'#4682B4',
	'#00FF7F',
	'#7FFF00',
	'#008000',
	'#32CD32',
	'#FFA500',
	'#FFD700',
	'#FF4500',
	'#D2691E',
	'#8B4513',
	'#000080',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

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
		'Số lượng bóng đèn': 6398,
	},
	{
		name: 'Tháng 3',
		'Tiền điện': 2000,
		'Số lượng bóng đèn': 9800,
	},
	{
		name: 'Tháng 4',
		'Tiền điện': 2780,
		'Số lượng bóng đèn': 5908,
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
		'Tiền điện': 2000,
		'Số lượng bóng đèn': 2000,
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

const data5 = [
	{ index: 10000, red: 1643 },
	{ index: 1666, red: 182 },
	{ index: 625, red: 116 },
	{ index: 7500, red: 645 },
	{ index: 1666, red: 882 },
	{ index: 625, red: 56 },
	{ index: 7500, red: 1145 },
	{ index: 5500, red: 345 },
	{ index: 500, red: 1005 },
	{ index: 2500, red: 1505 },
	{ index: 2500, red: 505 },
	{ index: 2500, red: 205 },
	{ index: 1500, red: 1105 },
	{ index: 5500, red: 105 },
	// đường line
	{ index: 0, redLine: 0 },
	{ index: 10000, redLine: 1800 },
];

const data6 = [
	{
		type: 'boxPlot',
		data: [
			{
				x: 'Jan 2015',
				y: [54, 66, 69, 75, 88],
			},
			{
				x: 'Jan 2016',
				y: [43, 65, 69, 76, 81],
			},
			{
				x: 'Jan 2017',
				y: [31, 39, 45, 51, 59],
			},
			{
				x: 'Jan 2018',
				y: [39, 46, 55, 65, 71],
			},
			{
				x: 'Jan 2019',
				y: [29, 31, 35, 39, 44],
			},
			{
				x: 'Jan 2020',
				y: [41, 49, 58, 61, 67],
			},
			{
				x: 'Jan 2021',
				y: [54, 59, 66, 71, 88],
			},
		],
	},
];
const options = {
	chart: {
		type: 'boxPlot',
		height: 350,
	},
	title: {
		text: 'BoxPlot',
		align: 'middle',
	},
};

const ConsumeDashboard = () => {
	const { role } = useContext(AuthToken);
	const diaPhuongRef = useRef(null);
	const yearRef = useRef(null);
	const monthRef = useRef(null);
	const dayRef = useRef(null);

	const [listKhuVuc, setListKhuVuc] = useState([]);
	const [selectedKhuVuc, setSelectedKhuVuc] = useState('');

	const [listTram, setListTram] = useState([]);
	const [selectedTram, setSelectedTram] = useState('');

	const [dataChart, setDataChart] = useState(null);
	const [barsName, setBarsName] = useState('ngay_do__year');
	const [describe, setDescribe] = useState(null);
	const [showDes, setShowDes] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		fetchListKhuVuc();
		fetchListTram();
	}, []);

	// lấy danh sách khu vực
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

	// lấy danh sách trạm
	const fetchListTram = async (tramId) => {
		try {
			setIsLoading(true);
			const res = await userApi.getTram(tramId);
			setListTram(res.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	const handleChangeKhuVuc = (e) => {
		setSelectedKhuVuc(e.target.value);
		setSelectedTram('-1');
		if (e.target.value !== '-1') fetchListTram(e.target.value);
		else fetchListTram();
	};

	const handlerChangeTram = (e) => {
		setSelectedTram(e.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const data = {};

		if (yearRef.current.value) {
			setBarsName('ngay_do__month');
			data.nam = yearRef.current.value;
			if (monthRef.current.value) {
				setBarsName('ngay_do__day');
				data.thang = monthRef.current.value;
			}
		}
		if (selectedKhuVuc) data.khuVuc = selectedKhuVuc;
		if (selectedTram) data.tram = selectedTram;

		try {
			const res = await analysisApi.chartDienNangTieuThuThanhTien(data);
			console.log(data);
			if (res.data) {
				setDataChart(res.data.data);
				setDescribe(res.data.describe);
				console.log(res.data.describe);
			} else {
				setDataChart(null);
				setDescribe(null);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);

			setErrorMessage('Truy vấn không thành công');
			setTimeout(() => setErrorMessage(''), 2000);
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
					<Row className="mb-5">
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
											disabled
											ref={monthRef}
										></Form.Control>
									</Col>
									<Col md={3}>
										<b>Ngày</b>
										<Form.Control
											type="number"
											disabled
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
											<option value="">Tất cả</option>
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
											<option hidden>Trạm</option>
											<option value="">Tất cả</option>
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
							<Container>
								<Row className="justify-content-md-center">
									<Col lg={8}>
										<ComposedChart
											width={800}
											height={300}
											data={dataChart}
										>
											<XAxis
												dataKey={barsName}
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
										<Col
											lg={12}
											className="text-center r-2"
										>
											<p>
												BIểu đồ thể hiện lượng điện năng
												tiêu thụ và thành tiền theo
												năm(Kwh)
											</p>
										</Col>
									</Col>
									{showDes && (
										<Col lg={4}>
											<ConvertToTable df={describe} />
										</Col>
									)}
								</Row>
								<Row className="justify-content-md-center">
									<Button
										className="w-25"
										onClick={() => setShowDes(!showDes)}
									>
										{showDes ? 'Đóng mô tả' : 'Hiện mô tả'}
									</Button>
								</Row>
							</Container>
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
												name="Điện năng"
												dataKey="tong_gia_tri"
												fill="#F66161"
												activeBar={
													<Rectangle
														fill="pink"
														stroke="blue"
													/>
												}
											/>
											<Bar
												name="Tổng tiền"
												dataKey={(dataChart) =>
													dataChart.tong_thanh_tien /
													1000
												}
												fill="#39BF5A"
												activeBar={
													<Rectangle
														fill="gold"
														stroke="purple"
													/>
												}
											/>
										</BarChart>
									</ResponsiveContainer>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ và thành tiền theo năm
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col lg={12}>
									<ResponsiveContainer
										width={600}
										height={500}
									>
										<PieChart>
											<Pie
												data={dataChart}
												cx="50%"
												cy="50%"
												labelLine={false}
												outerRadius={170}
												fill="#8884d8"
												dataKey="tong_gia_tri"
												label={renderCustomizedLabel}
											>
												{dataChart.map(
													(entry, index) => (
														<Cell
															name={`Tháng ${entry.ngay_do__month}`}
															key={`cell-${index}`}
															fill={
																COLORS[
																	index %
																		COLORS.length
																]
															}
														/>
													)
												)}
											</Pie>
											<Tooltip />
											<Legend
												layout="vertical"
												verticalAlign="middle"
												align="right"
											/>
										</PieChart>
									</ResponsiveContainer>
									<Col lg={6} className="text-center r-2">
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
												dataKey="ngay_do__month"
												fontSize={10}
											/>
											<YAxis fontSize={10} />
											<Tooltip />
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Line
												name="Điện năng"
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
									<AreaChart
										width={730}
										height={250}
										data={dataChart}
										margin={{
											top: 10,
											right: 30,
											left: 0,
											bottom: 0,
										}}
									>
										<defs>
											<linearGradient
												id="colorUv"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#8884d8"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="#8884d8"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient
												id="colorPv"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#82ca9d"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="#82ca9d"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<XAxis
											dataKey="ngay_do__month"
											fontSize={10}
										/>
										<YAxis />
										<CartesianGrid strokeDasharray="3 3" />
										<Tooltip />
										<Area
											name="Điện năng"
											type="monotone"
											dataKey="tong_gia_tri"
											stroke="#8884d8"
											fillOpacity={1}
											fill="url(#colorUv)"
										/>
										<Area
											type="monotone"
											name="Tổng tiền"
											dataKey={(dataChart) =>
												dataChart.tong_thanh_tien / 1000
											}
											stroke="#82ca9d"
											fillOpacity={1}
											fill="url(#colorPv)"
										/>
									</AreaChart>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ và thành tiền
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
								<Col>
									<ResponsiveContainer
										width={800}
										height={300}
									>
										<ComposedChart
											width={500}
											height={400}
											data={data5}
											margin={{
												top: 20,
												right: 80,
												bottom: 20,
												left: 20,
											}}
										>
											<CartesianGrid stroke="#f5f5f5" />
											<Tooltip />
											<Legend />

											<XAxis
												dataKey="index"
												type="number"
											/>
											<YAxis type="number" />
											<Scatter
												name="red"
												dataKey="red"
												fill="red"
											/>
											<Line
												dataKey="redLine"
												stroke="#FF7777"
												dot={false}
												activeDot={false}
												legendType="none"
											/>
										</ComposedChart>
									</ResponsiveContainer>
								</Col>
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
												stroke="#008905"
												fill="#008905"
											/>
											<Area
												name="Mật độ bóng đèn"
												type="monotone"
												dataKey="Số lượng bóng đèn"
												stroke="#F40000"
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
										<CartesianGrid stroke="#f5f5f5" />
										<Bar
											name="Điện năng"
											dataKey="tong_gia_tri"
											barSize={30}
											fill="#00B41D"
											activeBar={
												<Rectangle
													fill="#00760F"
													stroke="#00760F"
												/>
											}
										/>
										<Line
											type="monotone"
											name="Tổng tiền"
											dataKey={(dataChart) =>
												dataChart.tong_thanh_tien / 1000
											}
											stroke="#FF6421"
										/>
										<ReferenceLine
											y={averageEnergyConsumption}
											stroke="#808080"
											strokeDasharray="5 5"
											label={{
												position: 'insideTopRight',
												value: `Điện năng trung bình: ${averageEnergyConsumption.toFixed(
													2
												)} kWh`,
												fontSize: 12,
											}}
											// tính trung bình
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
								<Col>
									<ReactApexChart
										options={options}
										series={data6}
										type="boxPlot"
										width={850}
										height={350}
									/>
								</Col>
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
			<WrapperStyled>
				<Container
					fluid="md"
					className="mt-5 border-top border-primary"
				>
					<Row>
						<Col>
							<Form onSubmit={() => console.log('form 2')}>
								<TitleStyled className="mt-5 mb-2">
									Thời gian truy cập
								</TitleStyled>
								<Row className="justify-content-between">
									<Col md={4}>
										<p>Ngày bắt đầu</p>
										<input type="date" ref={null} />
									</Col>
									<Col>
										<p>Ngày kết thúc</p>
										<input type="date" ref={null} />
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
												ref={null}
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
											onChange={null}
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
											onChange={null}
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
								<Col lg={12}>
									<ComposedChart
										width={830}
										height={300}
										data={dataChart}
									>
										<XAxis
											dataKey="ngay_do__month"
											fontSize={10}
										></XAxis>
										<YAxis fontSize={10} />
										<Tooltip />
										<Legend
											verticalAlign="top"
											height={36}
										/>
										<CartesianGrid stroke="#f5f5f5" />
										<Bar
											name="Điện năng"
											dataKey="tong_gia_tri"
											fill="#FFA500"
											activeBar={
												<Rectangle
													fill="pink"
													stroke="blue"
												/>
											}
										/>
										<Bar
											name="Tổng tiền"
											dataKey={(dataChart) =>
												dataChart.tong_thanh_tien / 1000
											}
											fill="#41AD4B"
											activeBar={
												<Rectangle
													fill="gold"
													stroke="purple"
												/>
											}
										/>
										<Line
											name="Điện năng"
											type="monotone"
											dataKey="tong_gia_tri"
											stroke="#CC3333"
										/>
									</ComposedChart>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ và thành tiền theo năm
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col lg={12}>
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
											<XAxis
												dataKey="ngay_do__month"
												fontSize={10}
											/>
											<YAxis fontSize={10} />

											<Tooltip />
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Bar
												name="Điện năng"
												dataKey="tong_gia_tri"
												fill="#F66161"
												activeBar={
													<Rectangle
														fill="pink"
														stroke="blue"
													/>
												}
											/>
											<Bar
												name="Tổng tiền"
												dataKey={(dataChart) =>
													dataChart.tong_thanh_tien /
													1000
												}
												fill="#39BF5A"
												activeBar={
													<Rectangle
														fill="gold"
														stroke="purple"
													/>
												}
											/>
										</BarChart>
									</ResponsiveContainer>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ và thành tiền theo năm
										</p>
									</Col>
								</Col>
							</Row>
							<Row className="mt-5">
								<Col lg={12}>
									<ResponsiveContainer
										width={600}
										height={500}
									>
										<PieChart>
											<Pie
												data={dataChart}
												cx="50%"
												cy="50%"
												labelLine={false}
												outerRadius={170}
												fill="#8884d8"
												dataKey="tong_gia_tri"
												label={renderCustomizedLabel}
											>
												{dataChart.map(
													(entry, index) => (
														<Cell
															name={`Tháng ${entry.ngay_do__month}`}
															key={`cell-${index}`}
															fill={
																COLORS[
																	index %
																		COLORS.length
																]
															}
														/>
													)
												)}
											</Pie>
											<Tooltip />
											<Legend
												layout="vertical"
												verticalAlign="middle"
												align="right"
											/>
										</PieChart>
									</ResponsiveContainer>
									<Col lg={6} className="text-center r-2">
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
												dataKey="ngay_do__month"
												fontSize={10}
											/>
											<YAxis fontSize={10} />
											<Tooltip />
											<Legend
												verticalAlign="top"
												height={36}
											/>
											<Line
												name="Điện năng"
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
									<AreaChart
										width={730}
										height={250}
										data={dataChart}
										margin={{
											top: 10,
											right: 30,
											left: 0,
											bottom: 0,
										}}
									>
										<defs>
											<linearGradient
												id="colorUv"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#8884d8"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="#8884d8"
													stopOpacity={0}
												/>
											</linearGradient>
											<linearGradient
												id="colorPv"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="#82ca9d"
													stopOpacity={0.8}
												/>
												<stop
													offset="95%"
													stopColor="#82ca9d"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<XAxis
											dataKey="ngay_do__month"
											fontSize={10}
										/>
										<YAxis />
										<CartesianGrid strokeDasharray="3 3" />
										<Tooltip />
										<Area
											name="Điện năng"
											type="monotone"
											dataKey="tong_gia_tri"
											stroke="#8884d8"
											fillOpacity={1}
											fill="url(#colorUv)"
										/>
										<Area
											type="monotone"
											name="Tổng tiền"
											dataKey={(dataChart) =>
												dataChart.tong_thanh_tien / 1000
											}
											stroke="#82ca9d"
											fillOpacity={1}
											fill="url(#colorPv)"
										/>
									</AreaChart>
									<Col lg={8} className="text-center r-2">
										<p>
											BIểu đồ thể hiện lượng điện năng
											tiêu thụ và thành tiền
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
								<Col>
									<ResponsiveContainer
										width={800}
										height={300}
									>
										<ComposedChart
											width={500}
											height={400}
											data={data5}
											margin={{
												top: 20,
												right: 80,
												bottom: 20,
												left: 20,
											}}
										>
											<CartesianGrid stroke="#f5f5f5" />
											<Tooltip />
											<Legend />

											<XAxis
												dataKey="index"
												type="number"
											/>
											<YAxis type="number" />
											<Scatter
												name="red"
												dataKey="red"
												fill="red"
											/>
											<Line
												dataKey="redLine"
												stroke="#FF7777"
												dot={false}
												activeDot={false}
												legendType="none"
											/>
										</ComposedChart>
									</ResponsiveContainer>
								</Col>
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
												stroke="#008905"
												fill="#008905"
											/>
											<Area
												name="Mật độ bóng đèn"
												type="monotone"
												dataKey="Số lượng bóng đèn"
												stroke="#F40000"
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
										<CartesianGrid stroke="#f5f5f5" />
										<Bar
											name="Điện năng"
											dataKey="tong_gia_tri"
											barSize={30}
											fill="#00B41D"
											activeBar={
												<Rectangle
													fill="#00760F"
													stroke="#00760F"
												/>
											}
										/>
										<Line
											type="monotone"
											name="Tổng tiền"
											dataKey={(dataChart) =>
												dataChart.tong_thanh_tien / 1000
											}
											stroke="#FF6421"
										/>
										<ReferenceLine
											y={averageEnergyConsumption}
											stroke="#808080"
											strokeDasharray="5 5"
											label={{
												position: 'insideTopRight',
												value: `Điện năng trung bình: ${averageEnergyConsumption.toFixed(
													2
												)} kWh`,
												fontSize: 12,
											}}
											// tính trung bình
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
								<Col>
									<ReactApexChart
										options={options}
										series={data6}
										type="boxPlot"
										width={850}
										height={350}
									/>
								</Col>
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
