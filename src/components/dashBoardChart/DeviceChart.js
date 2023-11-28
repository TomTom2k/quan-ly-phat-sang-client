import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import * as XLSX from 'xlsx';

import ConvertToTable from '../ConvertToTable';

const data = [
	{
		year: 2019,
		month: 1,
		soLuongTru: 32,
		soLuongDen: 64,
	},
	{
		year: 2019,
		month: 2,
		soLuongTru: 24,
		soLuongDen: 72,
	},
	{
		year: 2019,
		month: 3,
		soLuongTru: 22,
		soLuongDen: 22,
	},
	{
		year: 2019,
		month: 4,
		soLuongTru: 32,
		soLuongDen: 64,
	},
	{
		year: 2019,
		month: 5,
		soLuongTru: 42,
		soLuongDen: 84,
	},
	{
		year: 2019,
		month: 6,
		soLuongTru: 27,
		soLuongDen: 81,
	},
	{
		year: 2019,
		month: 7,
		soLuongTru: 29,
		soLuongDen: 58,
	},
	{
		year: 2019,
		month: 8,
		soLuongTru: 30,
		soLuongDen: 30,
	},
	{
		year: 2019,
		month: 9,
		soLuongTru: 31,
		soLuongDen: 62,
	},
	{
		year: 2019,
		month: 10,
		soLuongTru: 44,
		soLuongDen: 44,
	},
];

const DeviceChart = () => {
	const [isShow, setIsShow] = useState(true);

	const exportToExcel = () => {
		// Đổi tên các cột
		const renamedData = data.map((item) => ({
			Năm: item.year,
			Tháng: item.month,
			'Số lượng trụ': item.soLuongTru,
			'Số lượng bộ đèn': item.soLuongDen,
		}));

		// Chuyển đổi dữ liệu thành mảng 2D
		const dataArray = renamedData.map((item) => Object.values(item));

		// Tạo worksheet từ mảng dữ liệu
		const ws = XLSX.utils.aoa_to_sheet([
			Object.keys(renamedData[0]),
			...dataArray,
		]);

		// Tạo workbook và thêm worksheet vào đó
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		// Tạo tệp Excel và lưu nó vào ổ đĩa
		XLSX.writeFile(wb, 'Dữ liệu thiêt bị.xlsx', {
			bookType: 'xlsx',
			bookSST: false,
			type: 'binary',
		});
	};
	return (
		<Container className="mt-5">
			{/* <Row className="justify-content-end g-5">
				<Col md={2}>
					<Row>
						<Button onClick={() => setIsShow(!isShow)}>
							{!isShow ? 'Hiện mô tả' : 'Ẩn mô tả'}
						</Button>
					</Row>
				</Col>
				<Col md={2}>
					<Row>
						<Button onClick={exportToExcel}>Xuất file</Button>
					</Row>
				</Col>
			</Row> */}
			<Row>
				<h4 className="text-center">Khai thác thiết bị</h4>
			</Row>
			<Row className="align-items-center justify-content-between gx-5">
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
								top: 5,
								right: 30,
								left: 20,
								bottom: 15,
							}}
						>
							<XAxis
								xAxisId={0}
								dy={3}
								dx={-1}
								label={{
									value: 'Thời gian',
									angle: 0,
									position: 'left',
								}}
								interval={0}
								dataKey="month"
								tickLine={true}
								tick={{
									fontSize: 12,
									angle: 0,
								}}
							/>

							<XAxis
								xAxisId={1}
								dy={0}
								dx={0}
								label={{
									value: '',
									angle: 0,
									position: 'bottom',
								}}
								interval={11}
								dataKey="year"
								tickLine={false}
								tick={{
									fontSize: 16,
									angle: -1,
								}}
							/>
							<YAxis />
							<Tooltip />
							<CartesianGrid stroke="#f5f5f5" />
							<Bar
								dataKey="soLuongTru"
								name="Số lượng trụ"
								barSize={20}
								fill="#413ea0"
							/>
							<Bar
								dataKey="soLuongDen"
								name="Số lượng đèn"
								barSize={20}
								fill="#82ca9d"
							/>
						</ComposedChart>
					</Row>
				</Col>
				{/* <Col md={4} className="mr-5">
					<ConvertToTable
						df={describe}
						calculationType="tongGiaTri"
					/>
				</Col> */}
			</Row>
		</Container>
	);
};

export default DeviceChart;
