import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

import { files } from '../assets';
import fileApi from '../api/fileApi';
import AlterCus from '../components/AlterCus';
import LoadingCus from '../components/LoadingCus';

const WrapperStyled = styled.div`
	position: relative;
`;
const TitleStyled = styled.h4`
	color: var(--primary);
`;
const FullWidthButton = styled(Button)`
	width: 100%;
`;

const UpdateData = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [data, setData] = useState(null);
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
		} else {
			setSelectedFile(null);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (selectedFile) {
			try {
				setIsLoading(true);
				const response = await fileApi.uploadExcel(selectedFile);
				setData(response);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		} else {
			setShowError(true);
			// Sau 1 giây, ẩn thông báo lỗi
			setTimeout(() => {
				setShowError(false);
			}, 1000);
		}
	};

	return (
		<WrapperStyled className="py-5">
			<Container>
				<Row className="justify-content-center">
					<Col lg={8}>
						<Row>
							<Col>
								<TitleStyled>Cập nhật dữ liệu</TitleStyled>
								<p>
									Tải lên file dữ liệu hoàn chỉnh để tiến hành
									lưu trữ
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
							<TitleStyled>Dữ liệu mẫu</TitleStyled>
							<p>
								Tải về dữ liệu mẫu để tham khảo và nhập liệu và
								Excel template được cho sẵn
							</p>
							<a href={files.nullTemp} download>
								<FullWidthButton variant="outline-primary">
									Download Excel template
								</FullWidthButton>
							</a>
							<a href={files.nullTemp} download>
								<FullWidthButton variant="outline-primary">
									Download dữ liệu mẫu
								</FullWidthButton>
							</a>
						</div>
					</Col>
				</Row>
			</Container>
			{showError && (
				<AlterCus variant="danger">
					Vui lòng chọn file để tải lên
				</AlterCus>
			)}
			{isLoading && (
				<LoadingCus animation="border" variant="secondary">
					<span className="visually-hidden">Loading...</span>
				</LoadingCus>
			)}
		</WrapperStyled>
	);
};

export default UpdateData;
