import React, { useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import Input from '../Input';
import AlterCus from '../AlterCus';
import LoadingCus from '../LoadingCus';
import analysisApi from '../../api/analysisApi';
import { Area, ComposedChart, Legend, Line, XAxis, YAxis } from 'recharts';

function formatDate(month, year) {
	return `${year}-${(month + 1).toString().padStart(2, '0')}`;
}

const Compare = () => {
	const year1Ref = useRef(null);
	const year2Ref = useRef(null);
	const [data1, setData1] = useState(null);
	const [data2, setData2] = useState(null);
	const [dataChart, setDataChart] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!year1Ref.current.value) {
			setErrorMessage('Không được bỏ trống năm đầu tiên');
			setTimeout(() => setErrorMessage(''), 2000);
		} else if (!year2Ref.current.value) {
			setErrorMessage('Không được bỏ trống năm thứ hai');
			setTimeout(() => setErrorMessage(''), 2000);
		} else {
			setIsLoading(true);
			try {
				// Lấy năm đầu
				const res1 = await analysisApi.ChartKetHop(
					{
						monthStart: formatDate(0, year1Ref.current.value),
						monthEnd: formatDate(11, year1Ref.current.value),
					},
					'tongGiaTri'
				);
				setData1(res1.data?.data.data);
				// Lấy năm thứ 2
				const res2 = await analysisApi.ChartKetHop(
					{
						monthStart: formatDate(0, year2Ref.current.value),
						monthEnd: formatDate(11, year2Ref.current.value),
					},
					'tongGiaTri'
				);
				setData2(res2.data?.data.data);
				if (data1 && data2) {
					let data = [];
					data1.forEach((item, index) => {
						let combinedItem = {
							month: item.month,
							dntt1: item.tongGiaTri,
							dntt2: data2[index].tongGiaTri,
						};
						data.push(combinedItem);
					});
					setDataChart(data);
				}
			} catch (error) {
				setErrorMessage('Lấy dữ liệu không thành công');
				setTimeout(() => setErrorMessage(''), 2000);
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<Container className="mt-4">
			<Row className="mt-4">
				<Col md={6}>
					<h2 className="text-primary">So sánh dữ liệu các năm</h2>
					<p className="text-justify">
						Chọn 2 năm cần so sánh để xem dữ liệu. Nhập năm đầu tiên
						để lấy dữ liệu của năm thứ nhất muốn chọn. Nhập năm thứ
						hai để lấy dữ liệu của năm thứ hai muốn chọn
					</p>
				</Col>
			</Row>
			<Row>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col md={4}>
							<Input label="Năm đầu tiên">
								<Form.Control
									type="number"
									min="1900"
									max="3000"
									step="1"
									ref={year1Ref}
								/>
							</Input>
						</Col>
						<Col md={{ span: 4, offset: 4 }}>
							<Input label="Năm thứ hai">
								<Form.Control
									type="number"
									min="1900"
									max="3000"
									step="1"
									ref={year2Ref}
								/>
							</Input>
						</Col>
					</Row>
					<Row>
						<Col md={4}>
							<Button
								variant="primary"
								type="submit"
								className="mt-4"
							>
								Upload file hoàn chỉnh
							</Button>
						</Col>
					</Row>
				</Form>
			</Row>
			<hr />
			{dataChart && (
				<Row className="mt-4">
					<Col md={12}>
						<p className="h4 text-center">
							Biểu đồ so sánh độ chênh lệch điện năm tiêu thụ năm{' '}
							{year1Ref.current.value} - {year2Ref.current.value}
						</p>
					</Col>
					<Col md={12}>
						<Row className="overflow-x-auto user-select-none justify-content-center">
							<ComposedChart
								width={dataChart?.length !== 0 ? 820 : '100%'}
								height={400}
								data={dataChart}
								margin={{
									top: 30,
									right: 50,
									left: 20,
									bottom: 15,
								}}
							>
								<XAxis
									xAxisId={0}
									dy={3}
									dx={-1}
									label={{
										value: 'Tháng',
										angle: 0,
										position: 'left',
									}}
									interval={0}
									dataKey="thang"
									tickLine={true}
									tick={{
										fontSize: 12,
										angle: 0,
									}}
								/>
								<YAxis
									label={{
										value: 'kwh',
										angle: 0,
										position: 'top',
									}}
								/>
								<Legend verticalAlign="bottom" height={40} />
								<Line
									type="linear"
									dataKey="dntt1"
									stroke="#8884d8"
									fill="#8884d8"
									fillOpacity={0.3}
									name="Điện năm tiêu thụ năm đầu tiên"
								/>
								<Line
									type="linear"
									dataKey="dntt2"
									stroke="#82ca9d"
									fill="#82ca9d"
									fillOpacity={0.3}
									name="Điện năm tiêu thụ năm thứ hai"
								/>
							</ComposedChart>
						</Row>
					</Col>
				</Row>
			)}

			<AlterCus show={!!errorMessage} variant="danger">
				{errorMessage}
			</AlterCus>
			{isLoading && (
				<LoadingCus animation="border" variant="secondary">
					<span className="visually-hidden">Loading...</span>
				</LoadingCus>
			)}
		</Container>
	);
};

export default Compare;
