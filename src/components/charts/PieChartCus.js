import React from "react";

import {
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#87CEEB",
    "#4682B4",
    "#00FF7F",
    "#7FFF00",
    "#008000",
    "#32CD32",
    "#FFA500",
    "#FFD700",
    "#FF4500",
    "#D2691E",
    "#8B4513",
    "#000080",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieChartCus = ({ data, dataKey }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={170}
                    fill="#8884d8"
                    dataKey={dataKey}
                    label={renderCustomizedLabel}
                >
                    {null?.map((entry, index) => (
                        <Cell
                            name={`Tháng ${entry.ngay_do__month}`}
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                />
            </PieChart>
        </ResponsiveContainer>
    );
};
export default PieChartCus;
