import React from "react";
import {Row, Col} from "react-bootstrap";

import {
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Area,
} from "recharts";

const data4 = [
    {
        name: "Tháng 1",
        "Tiền điện": 1000,
        "Số lượng bóng đèn": 2400,
    },
    {
        name: "Tháng 2",
        "Tiền điện": 3000,
        "Số lượng bóng đèn": 6398,
    },
    {
        name: "Tháng 3",
        "Tiền điện": 2000,
        "Số lượng bóng đèn": 9800,
    },
    {
        name: "Tháng 4",
        "Tiền điện": 2780,
        "Số lượng bóng đèn": 5908,
    },
    {
        name: "Tháng 5",
        "Tiền điện": 1890,
        "Số lượng bóng đèn": 4800,
    },
    {
        name: "Tháng 6",
        "Tiền điện": 2390,
        "Số lượng bóng đèn": 3800,
    },
    {
        name: "Tháng 7",
        "Tiền điện": 3490,
        "Số lượng bóng đèn": 4300,
    },
    {
        name: "Tháng 8",
        "Tiền điện": 2000,
        "Số lượng bóng đèn": 2000,
    },
    {
        name: "Tháng 9",
        "Tiền điện": 0,
        "Số lượng bóng đèn": 0,
    },
    {
        name: "Tháng 10",
        "Tiền điện": 0,
        "Số lượng bóng đèn": 0,
    },
    {
        name: "Tháng 11",
        "Tiền điện": 0,
        "Số lượng bóng đèn": 0,
    },
    {
        name: "Tháng 12",
        "Tiền điện": 0,
        "Số lượng bóng đèn": 0,
    },
];

const HistogramChart = () => {
    return (
        <Row className="mt-5">
            <Col>
                <ComposedChart
                    width={800}
                    height={300}
                    data={data4}
                    margin={{
                        top: 20,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis
                        dataKey="name"
                        fontSize={10}
                        label={{
                            value: "Tháng",
                            position: "insideBottomRight",
                            fontSize: 10,
                        }}
                    />
                    <YAxis
                        type="number"
                        fontSize={10}
                        domain={[0, "dataMax + 1000"]}
                        label={{
                            value: "Bóng đèn(cái)",
                            angle: -90,
                            position: "insideLeft",
                            textAnchor: "middle",
                            fontSize: 12,
                        }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Area
                        type="step"
                        dataKey="Số lượng bóng đèn"
                        stroke="#008905"
                        fill="#008905"
                    />
                    <Area
                        name="Mật độ bóng đèn"
                        type="monotone"
                        dataKey="Số lượng bóng đèn"
                        stroke="#F40000"
                        fill="rgba(255, 255, 255, 0.00)"
                    />
                </ComposedChart>
                <Col lg={8} className="text-center r-2">
                    <p>
                        Biểu đồ thể hiện số lượng bóng đèn và mật độ xuất hiện
                    </p>
                </Col>
            </Col>
        </Row>
    );
};
export default HistogramChart;
