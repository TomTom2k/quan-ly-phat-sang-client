import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Line,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import ConvertToTable from '../ConvertToTable';

const CombineChart = ({ data, describe }) => {
	return (
		<Container>
			<Row className="align-items-center justify-content-between gx-5">
				<Col md={8}>
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
							<YAxis yAxisId="giaTri" orientation="right" />
							<YAxis yAxisId="thanhTien" />
							<Tooltip />
							{/* <Legend verticalAlign="top" height={30} /> */}
							<CartesianGrid stroke="#f5f5f5" />
							<Bar
								dataKey="tongThanhTien"
								name="Tổng thành tiền"
								yAxisId="thanhTien"
								barSize={20}
								fill="#413ea0"
							/>
							<Line
								type="monotone"
								dataKey="tongGiaTri"
								yAxisId="giaTri"
								name="Tổng giá trị"
								stroke="#ff7300"
							/>
						</ComposedChart>
					</Row>
				</Col>
				<Col md={4}>
					<ConvertToTable df={describe} />
				</Col>
			</Row>
		</Container>
	);
};

export default CombineChart;
