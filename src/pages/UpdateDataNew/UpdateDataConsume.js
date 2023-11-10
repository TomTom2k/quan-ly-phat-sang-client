import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Container, Button, Form, Table } from 'react-bootstrap';
import fileApi from '../../api/fileApi';
import { files } from '../../assets';
import AlterCus from '../../components/AlterCus';
import LoadingCus from '../../components/LoadingCus';
import ConfirmDialog from '../../components/ConfirmDialog';

const UpdateDataConsume = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [data, setData] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const showAlter = (callback, data) => {
		callback(data);
		setTimeout(() => callback(false), 1000);
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
			if ((response.status = 201)) {
				setData(response.data);
				setIsSuccess(true);
			} else {
				showAlter(setError, 'Tải file không thành công');
				console.log('error: ', response.data);
			}
		} catch (error) {
			console.error('Error uploading file:', error);
		}
		setIsLoading(false);
	};

	const handlerCancel = () => {
		setIsSuccess(false);
	};

	const handleConfirm = async () => {
		try {
			const res = await fileApi.confirmTieuThu();
			if ((res.status = 200)) {
				setIsSuccess(false);
			} else {
				showAlter(setError, 'Lưu dữ liệu không thành công');
			}
		} catch (error) {
			console.error('Error saving data:', error);
		}
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
							<a href={files.tieuThu} download>
								<Button
									className="w-100"
									variant="outline-primary"
								>
									Download Excel template
								</Button>
							</a>
							<a href={files.tieuThu} download>
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
			</Container>
			<AlterCus show={!!error} variant="danger">
				{error}
			</AlterCus>
			<ConfirmDialog
				show={isSuccess}
				onConfirm={handleConfirm}
				onClose={handlerCancel}
			>
				Tải lên thành công. Xác nhận lưu?
			</ConfirmDialog>
			{isLoading && (
				<LoadingCus animation="border" variant="secondary">
					<span className="visually-hidden">Loading...</span>
				</LoadingCus>
			)}
		</>
	);
};

export default UpdateDataConsume;
