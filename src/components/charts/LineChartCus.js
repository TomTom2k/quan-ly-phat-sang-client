import React from "react";
import {Row, Col} from "react-bootstrap";

import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line,
    LineChart,
} from "recharts";

const LineChartCus = ({ data, dataKey }) => {
	return (
		<Row className="mt-5">
			<Col>
				<LineChart
					width={850}
					height={300}
					data={null}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 1,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="ngay_do__month" fontSize={10} />
					<YAxis fontSize={10} />
					<Tooltip />
					<Legend verticalAlign="top" height={36} />
					<Line
						name="Điện năng"
						type="monotone"
						dataKey="tong_gia_tri"
						stroke="#FF3030"
					/>
				</LineChart>
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
export default LineChartCus;
