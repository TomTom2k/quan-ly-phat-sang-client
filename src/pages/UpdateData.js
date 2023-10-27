import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';
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
	const [filesData, setFilesData] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [showError, setShowError] = useState(false);

	const mergeFilesData = () => {
		let mergedData = [];
		filesData.forEach((data) => {
			mergedData = [...mergedData, ...data];
		});
		return mergedData;
	};

	const handleFilesTmpChange = (event) => {
		const files = event.target.files;
		let loadedFilesData = [];

		Array.from(files).forEach((file, index) => {
			const reader = new FileReader();
			reader.onload = (evt) => {
				const bstr = evt.target.result;
				const wb = XLSX.read(bstr, { type: 'binary' });
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json(ws);

				loadedFilesData.push(data);

				// Ensure all files are read
				if (index === files.length - 1) {
					setFilesData(loadedFilesData);
				}
			};
			reader.readAsBinaryString(file);
		});

		console.log(files);
	};

	const handleMergeFiles = (event) => {
		event.preventDefault();

		const mergedData = mergeFilesData();
		const ws = XLSX.utils.json_to_sheet(mergedData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'MergedData');

		// Tải file lên máy chủ hoặc lưu trực tiếp vào máy tính của người dùng
		XLSX.writeFile(wb, 'merged_data.xlsx');
	};

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
								<Col>
									<Form.Group>
										<Form.Control
											type="file"
											className="w-50"
											multiple
											onChange={handleFilesTmpChange}
										/>
									</Form.Group>
									<Button
										variant="outline-primary"
										onClick={handleMergeFiles}
									>
										Download dữ liệu đã chọn
									</Button>
								</Col>
							</Col>
						</Row>
						<Row className="mt-5">
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
