import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { AuthToken } from '../../authToken';
import Input from '../../components/Input';
import userApi from '../../api/userApi';

const OptionQueryTime = ({ onSubmit }) => {
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
			setListKhuVuc(res.data.khu_vuc_data);
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
			setListTram(res.data.tram_data);
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
	return (
		<Form onSubmit={onSubmit}>
			<Row className="justify-content-between">
				<Col md={12}>
					<p className="text-primary h3">Vị trí truy cập</p>
				</Col>
				{role && (
					<Col md={2}>
						<Input label="Địa phương">
							<Form.Select aria-label="Default select example">
								<option value="">Tất cả</option>
								<option value="1">Cần Thơ</option>
								<option value="2">Đà Nẵng</option>
								<option value="3">Nha Trang</option>
								<option value="3">Thành phố Hồ Chí Minh</option>
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
							{listKhuVuc.map((khuvuc) => (
								<option
									key={khuvuc.khu_vuc_id}
									value={khuvuc.khu_vuc_id}
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
							{listTram.map((tram) => (
								<option key={tram.tram_id} value={tram.tram_id}>
									{tram.ten_tram} - {tram.dia_chi}
								</option>
							))}
						</Form.Select>
					</Input>
				</Col>
			</Row>
			<Row className="mt-5">
				<Container md={12}>
					<p className="text-primary h3">Thời gian truy cập</p>
				</Container>
				<Container md={12}>
					<Row className="justify-content-between ">
						<Col md={3}>
							<Input label="Năm">
								<Form.Control type="number" ref={yearRef} />
							</Input>
						</Col>
						<Col md={3}>
							<Input label="Tháng">
								<Form.Control type="number" disabled />
							</Input>
						</Col>
						<Col md={3}>
							<Input label="Ngày">
								<Form.Control type="number" disabled />
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
	);
};

export default OptionQueryTime;
