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

const ConsumeChart = ({ data, describe }) => {
	const [isShow, setIsShow] = useState(true);

	const exportToExcel = () => {
		// Đổi tên các cột
		const renamedData = data.map((item) => ({
			Năm: item.year,
			Tháng: item.month,
			'Tổng Giá Trị': item.tongGiaTri,
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
		XLSX.writeFile(wb, 'Dữ liệu tiêu thụ.xlsx', {
			bookType: 'xlsx',
			bookSST: false,
			type: 'binary',
		});
	};

	return (
		<Container className="mt-5">
			<Row className="justify-content-end gx-5 gy-2">
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
			</Row>
			<Row className="mt-5">
				<h4 className="text-center">Khai thác dữ liệu tiêu thụ</h4>
			</Row>
			<Row className="align-items-center justify-content-between gx-5">
				<Col md={isShow ? 8 : 12}>
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
							<YAxis yAxisId="giaTri" />
							<Tooltip />
							<CartesianGrid stroke="#f5f5f5" />
							<Bar
								dataKey="tongGiaTri"
								name="Tổng giá trị"
								yAxisId="giaTri"
								barSize={20}
								fill="#413ea0"
							/>
						</ComposedChart>
					</Row>
				</Col>
				{isShow && (
					<Col md={4} className="mr-5">
						<ConvertToTable
							df={describe}
							calculationType="tongGiaTri"
						/>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default ConsumeChart;
