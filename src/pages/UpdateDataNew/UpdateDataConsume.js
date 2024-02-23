import React, { useState } from 'react';
import { Row, Col, Container, Button, Form, Tabs, Tab } from 'react-bootstrap';
import fileApi from '../../api/fileApi';
import { files } from '../../assets';
import AlterCus from '../../components/AlterCus';
import LoadingCus from '../../components/LoadingCus';
import ConvertDfToTable from '../../components/ConvertDfToTable';

const UpdateDataConsume = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	const [data, setData] = useState(null);
	const [existingData, setExistingData] = useState(null);
	const [newData, setNewData] = useState(null);

	const [sheet, setSheet] = useState(0);

	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const showAlter = (callback, data) => {
		callback(data);
		setTimeout(() => callback(false), 3000);
	};
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
		} else {
			setSelectedFile(null);
		}
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!selectedFile) {
			showAlter(setError, 'Vui lòng chọn file tải lên');
			return;
		}

		setIsLoading(true);
		try {
			const response = await fileApi.uploadTieuThu(selectedFile);
			if (response.status === 201) {
				setData(response.data.data);
				setExistingData(response.data.existing_data);
				setNewData(response.data.new_data);
				showAlter(
					setSuccess,
					'Tải file thành công. Hãy chọn hình thức lưu'
				);
			} else {
				throw new Error('Tải file không thành công');
			}
		} catch (error) {
			showAlter(setError, 'Tải file không thành công');
			console.error('Error uploading file:', error);
		}
		setIsLoading(false);
	};
	const handlerSaveAll = async () => {
		setIsLoading(true);
		try {
			const res = await fileApi.confirmTieuThu({ confirm: true });
			if (res.status !== 200) {
				showAlter(setError, 'Lưu dữ liệu không thành công');
			} else {
				showAlter(setSuccess, 'Lưu dữ liệu thành công');
			}
		} catch (error) {
			console.error('Error saving data:', error);
		}
		setIsLoading(false);
	};
	const handlerSaveNew = async () => {
		setIsLoading(true);
		try {
			const res = await fileApi.confirmTieuThu({
				confirm: true,
				type: 'new',
			});
			if (res.status !== 200) {
				showAlter(setError, 'Lưu dữ liệu không thành công');
			} else {
				showAlter(setSuccess, 'Lưu dữ liệu thành công');
			}
		} catch (error) {
			console.error('Error saving data:', error);
		}
		setIsLoading(false);
	};
	const handlerSaveExisting = async () => {
		setIsLoading(true);
		try {
			const res = await fileApi.confirmTieuThu({
				confirm: true,
				type: 'existing',
			});
			if (res.status !== 200) {
				showAlter(setError, 'Lưu dữ liệu không thành công');
			} else {
				showAlter(setSuccess, 'Lưu dữ liệu thành công');
			}
		} catch (error) {
			console.error('Error saving data:', error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<Container>
				<Row className="justify-content-center">
					<Col lg={8}>
						<Row>
							<Col>
								<p className="h4 text-primary">
									Tải lên điện năng tiêu thụ
								</p>
								<p>
									Chọn file điện năng tiêu thụ theo mẫu để tải
									lên
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
						</Row>
					</Col>
					<Col lg={4}>
						<div className="d-grid gap-2">
							<p className="h4 text-primary">Dữ liệu mẫu</p>
							<p>
								Tải về dữ liệu mẫu để tham khảo và nhập liệu và
								Excel template được cho sẵn
							</p>
							<a href={files.tmpTT} download>
								<Button
									className="w-100"
									variant="outline-primary"
								>
									Download Excel template
								</Button>
							</a>
							<a href={files.demoTT} download>
								<Button
									className="w-100"
									variant="outline-primary"
								>
									Download dữ liệu mẫu
								</Button>
							</a>
						</div>
					</Col>
				</Row>
				{data && (
					<>
						<Row className="mt-2">
							<Col md={4}>
								<Form.Select
									aria-label="Default select example"
									onChange={(e) => setSheet(e.target.value)}
								>
									{data.map((d, index) => (
										<option value={index} key={index}>
											sheet {index + 1}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2}></Col>
							<Col md={2}>
								<Button
									className="w-100"
									onClick={handlerSaveAll}
								>
									Lưu tất cả
								</Button>
							</Col>
							<Col md={2}>
								<Button
									className="w-100"
									onClick={handlerSaveNew}
								>
									Lưu dữ liệu mới
								</Button>
							</Col>
							<Col md={2}>
								<Button
									className="w-100"
									onClick={handlerSaveExisting}
								>
									Lưu dữ liệu tồn tại
								</Button>
							</Col>
						</Row>
						<Tabs
							defaultActiveKey="data"
							id="uncontrolled-tab-example"
							className="mt-3"
						>
							<Tab eventKey="data" title="Dữ liệu upload">
								<Row>{ConvertDfToTable(data[sheet])}</Row>
							</Tab>
							<Tab
								eventKey="newData"
								title="Dữ liệu mới thêm vào"
							>
								<Row>{ConvertDfToTable(newData[sheet])}</Row>
							</Tab>
							<Tab
								eventKey="existingData"
								title="Dữ liệu đã tồn tại"
							>
								<Row>
									{ConvertDfToTable(existingData[sheet])}
								</Row>
							</Tab>
						</Tabs>
					</>
				)}
			</Container>
			<AlterCus show={!!error} variant="danger">
				{error}
			</AlterCus>
			<AlterCus show={!!success}>{success}</AlterCus>
			{isLoading && (
				<LoadingCus animation="border" variant="secondary">
					<span className="visually-hidden">Loading...</span>
				</LoadingCus>
			)}
		</>
	);
};

export default UpdateDataConsume;
