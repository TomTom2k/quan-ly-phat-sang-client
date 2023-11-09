import React from 'react';
import { Row, Col } from 'react-bootstrap';

import {
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid,
	Bar,
	BarChart,
	Rectangle,
} from 'recharts';

const BarChartCus = ({ data, dataKey, nameData }) => {
	console.log(dataKey);
	console.log(data);
	return (
		<>
			<BarChart
				width={800}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 15,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={dataKey} fontSize={10} />
				<YAxis fontSize={10} />

				<Tooltip />
				<Legend verticalAlign="top" height={36} />
				<Bar
					name={nameData}
					dataKey={dataKey}
					fill="#F66161"
					activeBar={<Rectangle fill="pink" stroke="blue" />}
				/>
			</BarChart>
		</>
	);
};
export default BarChartCus;
