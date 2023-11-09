import React from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
    BarChart,
    Rectangle,
    ResponsiveContainer,
} from "recharts";

const BarChartCus = ({ data, dataKey }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
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
                <YAxis unit="kWh" fontSize={10} />

                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Bar
                    barSize={40}
                    name="Điện năng"
                    dataKey="tong_gia_tri"
                    fill="#F66161"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
export default BarChartCus;
