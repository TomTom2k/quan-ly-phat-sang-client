import React from "react";

import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
} from "recharts";

const LineChartCus = ({ data, dataKey }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                width={850}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 1,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey} fontSize={10} />
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
        </ResponsiveContainer>
    );
};
export default LineChartCus;
