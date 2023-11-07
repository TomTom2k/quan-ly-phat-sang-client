import React from "react";
import { Row, Col } from "react-bootstrap";

import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ScatterChart,
    Scatter,
} from "recharts";

const data02 = [
    { x: "Tháng 1", y: 300, z: 200 },
    { x: "Tháng 2", y: 500, z: 260 },
    { x: "Tháng 3", y: 700, z: 400 },
    { x: "Tháng 4", y: 350, z: 280 },
    { x: "Tháng 5", y: 500, z: 500 },
    { x: "Tháng 6", y: 780, z: 200 },
    { x: "Tháng 7", y: 400, z: 200 },
    { x: "Tháng 8", y: 500, z: 260 },
    { x: "Tháng 9", y: 300, z: 400 },
    { x: "Tháng 10", y: 550, z: 280 },
    { x: "Tháng 11", y: 400, z: 500 },
    { x: "Tháng 12", y: 280, z: 200 },
];

const ScatterChartCus = ({ data, dataKey }) => {
	return (
		<Row className="mt-5">
			<Col>
				<ScatterChart
					width={830}
					height={400}
					margin={{
						top: 20,
						right: 20,
						bottom: 20,
						left: 20,
					}}
				>
					<CartesianGrid />
					<XAxis dataKey="x" fontSize={10} />
					<YAxis
						unit="kWh"
						type="number"
						dataKey="y"
						name="kWh"
						stroke="#8884d8"
					/>
					<YAxis
						type="number"
						fontSize={10}
						domain={[0, 'dataMax + 1000']}
						label={{
							value: 'Điện năng(Kwh)',
							angle: -90,
							position: 'left',
							textAnchor: 'middle',
							fontSize: 12,
						}}
					/>
					<Tooltip
						cursor={{
							strokeDasharray: '3 3',
						}}
					/>
					<Legend verticalAlign="top" height={36} />
					<Scatter
						name="Lượng điện năng tiêu thụ"
						data={data02}
						fill="#8884d8"
					/>
				</ScatterChart>
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

export default ScatterChartCus;
