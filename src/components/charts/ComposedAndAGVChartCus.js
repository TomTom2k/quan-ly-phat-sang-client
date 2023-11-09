import React from "react";
import "w3-css/w3.css";

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
    ResponsiveContainer,
} from "recharts";

const ComposedAndAGVChartCus = ({ data, dataKey }) => {
    const averageEnergyConsumption =
        data.reduce((total, item) => total + item["Điện năng tiêu thụ"], 0) /
        data.length;
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
                <XAxis dataKey={dataKey} fontSize={10}></XAxis>
                <YAxis
                    unit="kWh"
                    type="number"
                    fontSize={10}
                    domain={[0, "dataMax + 1000"]}
                    label={{
                        value: "Điện năng(Kwh)",
                        angle: -90,
                        position: "insideLeft",
                        textAnchor: "middle",
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
                    activeBar={<Rectangle fill="#00760F" stroke="#00760F" />}
                />
                <Line
                    type="monotone"
                    name="Tổng tiền"
                    dataKey={(dataChart) => dataChart?.tong_thanh_tien / 1000}
                    stroke="#FF6421"
                />
                <ReferenceLine
                    y={averageEnergyConsumption}
                    stroke="#808080"
                    strokeDasharray="5 5"
                    label={{
                        position: "insideTopRight",
                        value: `Điện năng trung bình: ${averageEnergyConsumption.toFixed(
                            2
                        )} kWh`,
                        fontSize: 12,
                    }}
                    // tính trung bình
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ComposedAndAGVChartCus;
