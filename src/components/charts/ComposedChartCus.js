import React from "react";
import { Row, Col } from "react-bootstrap";

import {
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line,
    Scatter,
} from "recharts";

const data5 = [
    { index: 10000, red: 1643 },
    { index: 1666, red: 182 },
    { index: 625, red: 116 },
    { index: 7500, red: 645 },
    { index: 1666, red: 882 },
    { index: 625, red: 56 },
    { index: 7500, red: 1145 },
    { index: 5500, red: 345 },
    { index: 500, red: 1005 },
    { index: 2500, red: 1505 },
    { index: 2500, red: 505 },
    { index: 2500, red: 205 },
    { index: 1500, red: 1105 },
    { index: 5500, red: 105 },
    // đường line
    { index: 0, redLine: 0 },
    { index: 10000, redLine: 1800 },
];

const ComposedChartCus = () => {
    return (
        <Row className="mt-5">
            <Col>
                <ComposedChart
                    width={800}
                    height={300}
                    data={data5}
                    margin={{
                        top: 20,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />

                    <XAxis dataKey="index" type="number" />
                    <YAxis type="number" />
                    <Scatter name="red" dataKey="red" fill="red" />
                    <Line
                        dataKey="redLine"
                        stroke="#FF7777"
                        dot={false}
                        activeDot={false}
                        legendType="none"
                    />
                </ComposedChart>
            </Col>
        </Row>
    );
};
export default ComposedChartCus;
