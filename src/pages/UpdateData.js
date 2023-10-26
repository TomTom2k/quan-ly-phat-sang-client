import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { files } from '../assets';
import AlterCus from '../components/AlterCus';

const WrapperStyled = styled.div``;
const TitleStyled = styled.h4`
	color: var(--primary);
`;
const FullWidthButton = styled(Button)`
	width: 100%;
`;

const UpdateData = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [showError, setShowError] = useState(false);

	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
		} else {
			setSelectedFile(null);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (selectedFile) {
			// Xử lý tệp tại đây. Ví dụ: Gửi nó lên máy chủ.
			console.log(selectedFile); // Để xem thông tin tệp
		} else {
			setShowError(true);
			// Sau 1 giây, ẩn thông báo lỗi
			setTimeout(() => {
				setShowError(false);
			}, 1000);
		}
	};

	return (
		<WrapperStyled>
			<Container className="mt-5">
				<Row className="justify-content-center">
					<Col lg={8}>
						<Row>
							<Col>
								<TitleStyled>
									Tạo file dữ liệu tự động
								</TitleStyled>
								<p>COMING SOON</p>
							</Col>
						</Row>
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
			{showError && <AlterCus>Vui lòng chọn file để tải lên</AlterCus>}
		</WrapperStyled>
	);
};

export default UpdateData;
