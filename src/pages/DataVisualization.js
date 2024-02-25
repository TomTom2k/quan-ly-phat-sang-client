import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LoadingCus from '../components/LoadingCus';
import AlterCus from '../components/AlterCus';
import { Area, ComposedChart, XAxis, YAxis } from 'recharts';
import Input from '../components/Input';
import visualApi from '../api/visualApi';

const DataVisualization = () => {
	const yearInputRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [data, setData] = useState(null);
	const [sheetIndex, setSheetIndex] = useState(0);

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
	const handleChangeDiaPhuong = (e) => {
		setSheetIndex(e.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!yearInputRef.current.value) {
			setErrorMessage('Vui lòng nhập năm muốn dự đoán');
			setTimeout(() => setErrorMessage(''), 2000);
		} else {
			setIsLoading(true);
			try {
				const res = await visualApi.uploadFile(
					selectedFile,
					yearInputRef.current.value
				);
				setData(res.data.result);
			} catch (error) {
				setErrorMessage('Tải file lên không thành công');
				setTimeout(() => setErrorMessage(''), 2000);
			} finally {
				setIsLoading(false);
			}
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
						<Input label="Năm">
							<Form.Control
								type="number"
								min="1900"
								max="3000"
								step="1"
								ref={yearInputRef}
							/>
						</Input>
						<Button
							variant="primary"
							type="submit"
							className="mt-4"
						>
							Upload file hoàn chỉnh
						</Button>
					</Form>
				</Col>
				{data && (
					<Col md={6}>
						<Row className="g-2">
							<Col md={12}>
								<h4 className="text-primary">Tùy chọn</h4>
							</Col>
							<Col md={12}>
								<Input label="Khu vực">
									<Form.Select
										aria-label="Default select example"
										onChange={handleChangeDiaPhuong}
									>
										{data?.map((sheet, index) => (
											<option key={index} value={index}>
												{sheet.khu_vuc}
											</option>
										))}
									</Form.Select>
								</Input>
							</Col>
						</Row>
					</Col>
				)}
			</Row>
			<hr />
			{data && (
				<Row className="mt-4">
					<Col md={12}>
						<Row className="overflow-x-auto user-select-none justify-content-center">
							<ComposedChart
								width={data?.length !== 0 ? 820 : '100%'}
								height={400}
								data={data[sheetIndex].dntt_theo_thang}
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
								<Area
									type="linear"
									dataKey="dntt_cu"
									stroke="#8884d8"
									fill="#8884d8"
									fillOpacity={0.3}
								/>
								<Area
									type="linear"
									dataKey="dntt_moi"
									stroke="#82ca9d"
									fill="#82ca9d"
									fillOpacity={0.3}
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

export default DataVisualization;
