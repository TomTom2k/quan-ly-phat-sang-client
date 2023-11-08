import React from "react";

import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
    AreaChart,
    ResponsiveContainer,
} from "recharts";

const AreaChartCus = ({ data, dataKey }) => {
    console.log(data);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                        />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey={dataKey} fontSize={10} />
                <YAxis fontSize={6} unit="kWh" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    name="Điện năng"
                    type="monotone"
                    dataKey="tong_gia_tri"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
export default AreaChartCus;
