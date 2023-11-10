import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';

import { images } from '../assets';
import { AuthToken } from '../authToken';
import userApi from '../api/userApi';
import analysisApi from '../api/analysisApi';

import {
	BarChart,
	AreaChart,
	LineChart,
	PieChart,
	TreeMapChart,
} from '../components/charts';
import Banner from '../components/Banner';
import Input from '../components/Input';
import RowChart from '../components/RowChart';
import LoadingCus from '../components/LoadingCus';
import AlterCus from '../components/AlterCus';

const WrapperStyled = styled.div`
	position: relative;
`;

const charts = [
	{
		key: 'barsChart',
		title: 'Bars Chart',
		Chart: BarChart,
	},
	{
		key: 'areaChart',
		title: 'Area Chart',
		Chart: AreaChart,
	},
	{
		key: 'lineChart',
		title: 'Line Chart',
		Chart: LineChart,
	},
	{
		key: 'pieChart',
		title: 'Pis Chart',
		Chart: PieChart,
	},
	{
		key: 'treemapChart',
		title: 'Treemap Chart',
		Chart: TreeMapChart,
	},
];

const ConsumeDashboard = () => {
	const { role } = useContext(AuthToken);
	// ref of input
	const yearRef = useRef(null);

	// state of input
	const [listDiaPhuonng, setListDiaPhuonng] = useState([]);
	const [selectedDiaPhuonng, setSelectedDiaPhuonng] = useState('');
	const [listKhuVuc, setListKhuVuc] = useState([]);
	const [selectedKhuVuc, setSelectedKhuVuc] = useState('');
	const [listTram, setListTram] = useState([]);
	const [selectedTram, setSelectedTram] = useState('');

	// state of chart
	const [dataChart, setDataChart] = useState(null);
	const [dataKey, setDataKey] = useState('ngay_do__year');
	const [describe, setDescribe] = useState(null);

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

	// truy vấn dữ liệu
	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const data = {};

		if (yearRef.current.value) {
			setDataKey('ngay_do__month');
			data.nam = yearRef.current.value;
		}
		if (selectedKhuVuc) data.khuVuc = selectedKhuVuc;
		if (selectedTram) data.tram = selectedTram;
		try {
			const res = await analysisApi.ChartThoiGian(data, 'tong_gia_tri');
			if (res.data) {
				setDataChart(res.data.data);
				setDescribe(res.data.describe);
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
		<>
			<Banner image={images.bgData} title={'Tiêu thụ'} />
			<WrapperStyled>
				<Container fluid="md" className="mt-5">
					<Row>
						<Col>
							<Form onSubmit={handleSubmit}>
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
														Thành phố Hồ Chí Minh
													</option>
												</Form.Select>
											</Input>
										</Col>
									)}
									<Col md={5}>
										<Input label="Khu vực">
											<Form.Select
												aria-label="Default select example"
												onChange={handleChangeKhuVuc}
											>
												<option value="">Tất cả</option>
												{listKhuVuc?.map((khuvuc) => (
													<option
														key={khuvuc.khu_vuc_id}
														value={
															khuvuc.khu_vuc_id
														}
													>
														{khuvuc.ten_khu_vuc}
													</option>
												))}
											</Form.Select>
										</Input>
									</Col>
									<Col md={5}>
										<Input label="Trạm">
											<Form.Select
												aria-label="Default select example"
												onChange={handlerChangeTram}
											>
												<option value="">Tất cả</option>
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
										<Row className="justify-content-between ">
											<Col md={3}>
												<Input label="Năm">
													<Form.Control
														type="number"
														ref={yearRef}
													/>
												</Input>
											</Col>
											<Col md={3}>
												<Input label="Tháng">
													<Form.Control
														type="number"
														disabled
													/>
												</Input>
											</Col>
											<Col md={3}>
												<Input label="Ngày">
													<Form.Control
														type="number"
														disabled
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
						</Col>
					</Row>
					{dataChart && (
						<>
							<Tabs
								defaultActiveKey="barsChart"
								id="listChart"
								className="mb-3"
							>
								{charts?.map((chart) => (
									<Tab
										eventKey={chart.key}
										title={chart.title}
									>
										<RowChart
											title="Biểu đồ thể hiện điện năng tiêu
												thụ theo thời gian"
											describe={describe}
											chart={
												<chart.Chart
													data={dataChart}
													xKey={dataKey}
													dataKey="tong_gia_tri"
													nameData="Điện năng"
												/>
											}
										/>
									</Tab>
								))}
							</Tabs>
						</>
					)}
				</Container>

				{errorMessage && (
					<AlterCus variant="danger">{errorMessage}</AlterCus>
				)}
				{isLoading && (
					<LoadingCus animation="border" variant="secondary" />
				)}
			</WrapperStyled>
		</>
	);
};

export default ConsumeDashboard;
