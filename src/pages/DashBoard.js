import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Nav, Row, Tab } from 'react-bootstrap';
import Banner from '../components/Banner';
import { images } from '../assets';
import Input from '../components/Input';
import { AuthToken } from '../authToken';
import userApi from '../api/userApi';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Brush } from 'react-bootstrap-icons';

const tabs = {
	combine: {
		key: 'combine',
		slogan: 'Tổng quan',
		banner: images.bgHome,
		title: 'Biểu đồ kết hợp',
		component: '1',
	},
	consume: {
		key: 'consume',
		slogan: 'Tiêu thụ',
		banner: images.bgData,
		title: 'Biểu đồ tiêu thụ',
		component: '2',
	},
	invoice: {
		key: 'invoice',
		slogan: 'Hóa đơn',
		banner: images.bgData2,
		title: 'Biểu đồ hóa đơn',
		component: '3',
	},
	device: {
		key: 'device',
		slogan: 'Thiết bị',
		banner: images.bgData3,
		title: 'Biểu đồ thiết bị',
		component: '4',
	},
};

const data = [
	{
		month: '8',
		year: '2021',
		uv: 2560,
	},
	{
		month: '9',
		year: '2021',
		uv: 2560,
	},
	{
		month: '10',
		year: '2021',
		uv: 2560,
	},
	{
		month: '11',
		year: '2021',
		uv: 2560,
	},
	{
		month: '12',
		year: '2021',
		uv: 2560,
	},
	{
		month: '1',
		year: '2022',
		uv: 2560,
	},
	{
		month: '2',
		year: '2022',
		uv: 2560,
	},
	{
		month: '3',
		year: '2022',
		uv: 2560,
	},
	{
		month: '4',
		year: '2022',
		uv: 2560,
	},
	{
		month: '5',
		year: '2022',
		uv: 2560,
	},
	{
		month: '6',
		year: '2022',
		uv: 2560,
	},
	{
		month: '7',
		year: '2022',
		uv: 2560,
	},
	{
		month: '8',
		year: '2022',
		uv: 2560,
	},
	{
		month: '9',
		year: '2022',
		uv: 2560,
	},
	{
		month: '10',
		year: '2022',
		uv: 2560,
	},
	{
		month: '11',
		year: '2022',
		uv: 0,
	},
	{
		month: '12',
		year: '2022',
		uv: 0,
	},
];

const DashBoard = () => {
	const { role } = useContext(AuthToken);
	const [tabCurrent, setTabCurrent] = useState(tabs.combine.key);
	// ref of input
	const monthStartRef = useRef(null);
	const monthEndRef = useRef(null);

	// state of input
	const [listDiaPhuonng, setListDiaPhuonng] = useState([]);
	const [selectedDiaPhuonng, setSelectedDiaPhuonng] = useState('');
	const [listKhuVuc, setListKhuVuc] = useState([]);
	const [selectedKhuVuc, setSelectedKhuVuc] = useState('');
	const [listTram, setListTram] = useState([]);
	const [selectedTram, setSelectedTram] = useState('');

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
			setListKhuVuc(res.data.data.khu_vuc_data);
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
			setListTram(res.data.data.tram_data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	// Cập nhật giá trị của khu vực và danh sách trạm khi đổi khu vực
	const handleChangeKhuVuc = (e) => {
		setSelectedKhuVuc(e.target.value);
		setSelectedTram('');
		if (e.target.value !== '') fetchListTram(e.target.value);
		else fetchListTram();
	};
	const handlerChangeTram = (e) => {
		setSelectedTram(e.target.value);
	};

	const handlerSelectAside = (eventKey) => {
		setTabCurrent(eventKey);
	};
	return (
		<>
			<Banner
				image={tabs[tabCurrent].banner}
				title={tabs[tabCurrent].slogan}
			/>

			<Container fluid>
				<Tab.Container
					id="left-tabs-example"
					defaultActiveKey={tabs.combine.key}
				>
					<Row>
						{/* aside */}
						<Col sm={2} className="p-0">
							<Nav
								variant="pills"
								className="flex-column position-sticky sticky-top"
								onSelect={handlerSelectAside}
							>
								{Object.values(tabs).map((tab) => (
									<Nav.Item key={tab && tab.key}>
										<Nav.Link
											eventKey={tab && tab.key}
											className="rounded-0"
										>
											{tab && tab.title}
										</Nav.Link>
									</Nav.Item>
								))}
							</Nav>
						</Col>
						{/* body */}
						<Col sm={10}>
							<Container className="mt-2">
								<Form onSubmit={null}>
									<Row className="justify-content-between">
										<Col md={12}>
											<p className="text-primary h3">
												Vị trí truy cập
											</p>
										</Col>
										{role && (
											<Col md={2}>
												<Input label="Địa phương">
													<Form.Select aria-label="Default select example">
														<option value="">
															Tất cả
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
															Thành phố Hồ Chí
															Minh
														</option>
													</Form.Select>
												</Input>
											</Col>
										)}
										<Col md={5}>
											<Input label="Khu vực">
												<Form.Select
													aria-label="Default select example"
													onChange={
														handleChangeKhuVuc
													}
												>
													<option value="">
														Tất cả
													</option>
													{listKhuVuc?.map(
														(khuvuc) => (
															<option
																key={
																	khuvuc.khu_vuc_id
																}
																value={
																	khuvuc.khu_vuc_id
																}
															>
																{
																	khuvuc.ten_khu_vuc
																}
															</option>
														)
													)}
												</Form.Select>
											</Input>
										</Col>
										<Col md={5}>
											<Input label="Trạm">
												<Form.Select
													aria-label="Default select example"
													onChange={handlerChangeTram}
												>
													<option value="">
														Tất cả
													</option>
													{listTram?.map((tram) => (
														<option
															key={tram.tram_id}
															value={tram.tram_id}
														>
															{tram.ten_tram} -{' '}
															{tram.dia_chi}
														</option>
													))}
												</Form.Select>
											</Input>
										</Col>
									</Row>
									<Row className="mt-5">
										<Container md={12}>
											<p className="text-primary h3">
												Thời gian truy cập
											</p>
										</Container>
										<Container md={12}>
											<Row className="justify-content-between">
												<Col md={3}>
													<Input label="Bắt đầu">
														<Form.Control
															type="month"
															ref={monthStartRef}
														/>
													</Input>
												</Col>
												<Col md={3}>
													<Input label="Kết thúc">
														<Form.Control
															type="month"
															ref={monthEndRef}
														/>
													</Input>
												</Col>
											</Row>
										</Container>
										<Container md={12}>
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
										</Container>
									</Row>
								</Form>
							</Container>
							<Container>
								<Row>
									<Col
										md={12}
										className="overflow-x-auto user-select-none d-flex justify-content-center"
									>
										<ResponsiveContainer
											width={data.length * 60}
											aspect={2.3}
										>
											<ComposedChart
												data={data}
												margin={{
													top: 5,
													right: 30,
													left: 20,
													bottom: 15,
												}}
											>
												<XAxis
													xAxisId={0}
													dy={3}
													dx={-1}
													label={{
														value: 'Thời gian',
														angle: 0,
														position: 'left',
													}}
													interval={0}
													dataKey="month"
													tickLine={true}
													tick={{
														fontSize: 12,
														angle: 0,
													}}
												/>

												<XAxis
													xAxisId={1}
													dy={0}
													dx={0}
													label={{
														value: '',
														angle: 0,
														position: 'bottom',
													}}
													interval={11}
													dataKey="year"
													tickLine={false}
													tick={{
														fontSize: 16,
														angle: -1,
													}}
												/>
												<YAxis />
												<Tooltip />
												<Legend
													verticalAlign="top"
													height={30}
												/>
												<CartesianGrid stroke="#f5f5f5" />
												<Brush
													dataKey="month"
													height={300}
													stroke="#8884d8"
												/>
												<Bar
													dataKey="uv"
													barSize={20}
													fill="#413ea0"
												/>
												<Line
													type="monotone"
													dataKey="uv"
													stroke="#ff7300"
												/>
											</ComposedChart>
										</ResponsiveContainer>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</>
	);
};

export default DashBoard;
