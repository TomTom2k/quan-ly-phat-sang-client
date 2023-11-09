import React, { useState } from 'react';
import { Row, Col, Container, Button, Form, Table } from 'react-bootstrap';
import styled from 'styled-components';
import fileApi from '../../api/fileApi';
import { files } from '../../assets';
import AlterCus from '../../components/AlterCus';
import LoadingCus from '../../components/LoadingCus';
const TitleStyled = styled.h4`
	color: var(--primary);
`;
const FullWidthButton = styled(Button)`
	width: 100%;
`;

const UpdateDataDevice = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [data, setData] = useState(null);
	const [sheet, setSheet] = useState(0);
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
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
			setShowError(true);
			setTimeout(() => setShowError(false), 1000);
			return;
		}

		setIsLoading(true);
		try {
			const response = await fileApi.uploadThietBi(selectedFile);
			setData(response);
		} catch (error) {
			console.error('Error uploading file:', error);
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
								<TitleStyled>
									Cập nhật dữ liệu thiết bị mới
								</TitleStyled>
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
							<a href={files.thietBi} download>
								<FullWidthButton variant="outline-primary">
									Download Excel template
								</FullWidthButton>
							</a>
							<a href={files.thietBi} download>
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
		</>
	);
};

export default UpdateDataDevice;
