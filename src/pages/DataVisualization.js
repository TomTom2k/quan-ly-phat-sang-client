import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LoadingCus from '../components/LoadingCus';
import AlterCus from '../components/AlterCus';
import { Area, ComposedChart, XAxis, YAxis } from 'recharts';
import Input from '../components/Input';

const DataVisualization = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [data, setData] = useState(null);

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
		} else {
			setSelectedFile(null);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			setData([
				{ month: 1, dnttExp: 180, dnttAct: 60 },
				{ month: 2, dnttExp: 210, dnttAct: 70 },
				{ month: 3, dnttExp: 150, dnttAct: 50 },
				{ month: 4, dnttExp: 150, dnttAct: 50 },
				{ month: 5, dnttExp: 150, dnttAct: 50 },
				{ month: 6, dnttExp: 150, dnttAct: 50 },
				{ month: 7, dnttExp: 150, dnttAct: 50 },
				{ month: 8, dnttExp: 150, dnttAct: 50 },
				{ month: 9, dnttExp: 150, dnttAct: 50 },
				{ month: 10, dnttExp: 150, dnttAct: 50 },
				{ month: 11, dnttExp: 150, dnttAct: 50 },
				{ month: 12, dnttExp: 150, dnttAct: 50 },
			]);
		} catch (error) {
			setErrorMessage('Tải file lên không thành công');
			setTimeout(() => setErrorMessage(''), 2000);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Container>
			<Row className="mt-4 g-4">
				<Col md={6}>
					<h2 className="text-primary">
						Tải lên dữ liệu muốn so sánh
					</h2>
					<p>
						Chọn file dữ liệu thiết bị thay đổi để so sánh với dữ
						liệu tiêu thụ thực tế
					</p>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Control
								type="file"
								className="w-50"
								onChange={handleFileChange}
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							className="mt-4"
						>
							Upload file hoàn chỉnh
						</Button>
					</Form>
				</Col>
				<Col md={6}>
					<Row className="g-2">
						<Col md={12}>
							<h4 className="text-primary">Tùy chọn</h4>
						</Col>
						<Col md={12}>
							<Input label="Địa phương">
								<Form.Select
									aria-label="Default select example"
									// onChange={handleChangeDiaPhuong}
								>
									<option value="">Tất cả</option>
								</Form.Select>
							</Input>
						</Col>
						<Col md={6}>
							<Input label="Năm">
								<Form.Control
									type="number"
									min="1900"
									max="3000"
									step="1"
								/>
							</Input>
						</Col>
						<Col md={6} className="d-flex align-items-end">
							<Button className="w-100">Trực quan</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<hr />
			<Row className="mt-4">
				<Col md={12}>
					<Row className="overflow-x-auto user-select-none justify-content-center">
						<ComposedChart
							width={
								data?.length !== 0
									? Math.max(data?.length * 60, 820)
									: '100%'
							}
							height={400}
							data={data}
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
									position: 'right',
								}}
								interval={0}
								dataKey="month"
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
							<Area
								type="linear"
								dataKey="dnttAct"
								stroke="#8884d8"
								fill="#8884d8"
								fillOpacity={0.3}
							/>
							<Area
								type="linear"
								dataKey="dnttExp"
								stroke="#82ca9d"
								fill="#82ca9d"
								fillOpacity={0.3}
							/>
						</ComposedChart>
					</Row>
				</Col>
			</Row>
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

export default DataVisualization;
