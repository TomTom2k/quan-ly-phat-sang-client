import React from 'react';
import { Row, Col } from 'react-bootstrap';
import 'w3-css/w3.css';

import {
	ComposedChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	Bar,
	Line,
	Rectangle,
	ReferenceLine,
} from 'recharts';
const data = [
	{
		name: 'Tháng 1',
		'Tiền điện': 1000,
		'Điện năng tiêu thụ': 2400,
	},
	{
		name: 'Tháng 2',
		'Tiền điện': 3000,
		'Điện năng tiêu thụ': 1398,
	},
	{
		name: 'Tháng 3',
		'Tiền điện': 2000,
		'Điện năng tiêu thụ': 9800,
	},
	{
		name: 'Tháng 4',
		'Tiền điện': 2780,
		'Điện năng tiêu thụ': 3908,
	},
	{
		name: 'Tháng 5',
		'Tiền điện': 1890,
		'Điện năng tiêu thụ': 4800,
	},
	{
		name: 'Tháng 6',
		'Tiền điện': 2390,
		'Điện năng tiêu thụ': 3800,
	},
	{
		name: 'Tháng 7',
		'Tiền điện': 3490,
		'Điện năng tiêu thụ': 4300,
	},
	{
		name: 'Tháng 8',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 9',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 10',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 11',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
	{
		name: 'Tháng 12',
		'Tiền điện': 0,
		'Điện năng tiêu thụ': 0,
	},
];

const averageEnergyConsumption =
	data.reduce((total, item) => total + item['Điện năng tiêu thụ'], 0) /
	data.length;

const ComposedAndAGVChartCus = ({ data, dataKey }) => {
	return (
		<Row className="mt-5">
			<Col>
				<ComposedChart width={830} height={300} data={null}>
					<XAxis dataKey="ngay_do__month" fontSize={10}></XAxis>
					<YAxis
						unit="kWh"
						type="number"
						fontSize={10}
						domain={[0, 'dataMax + 1000']}
						label={{
							value: 'Điện năng(Kwh)',
							angle: -90,
							position: 'insideLeft',
							textAnchor: 'middle',
							fontSize: 12,
						}}
					/>
					<Tooltip />
					<Legend verticalAlign="top" height={36} />
					<CartesianGrid stroke="#f5f5f5" />
					<Bar
						name="Điện năng"
						dataKey="tong_gia_tri"
						barSize={30}
						fill="#00B41D"
						activeBar={
							<Rectangle fill="#00760F" stroke="#00760F" />
						}
					/>
					<Line
						type="monotone"
						name="Tổng tiền"
						dataKey={(dataChart) =>
							dataChart?.tong_thanh_tien / 1000
						}
						stroke="#FF6421"
					/>
					<ReferenceLine
						y={averageEnergyConsumption}
						stroke="#808080"
						strokeDasharray="5 5"
						label={{
							position: 'insideTopRight',
							value: `Điện năng trung bình: ${averageEnergyConsumption.toFixed(
								2
							)} kWh`,
							fontSize: 12,
						}}
						// tính trung bình
					/>
				</ComposedChart>
				<Col lg={8} className="text-center r-2">
					<p>
						BIểu đồ thể hiện lượng điện năng tiêu thụ theo
						tháng(Kwh)
					</p>
				</Col>
			</Col>
		</Row>
	);
};

export default ComposedAndAGVChartCus;
