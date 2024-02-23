import React, { PureComponent } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Input from "../components/Input";

const data = [
    {
        month: "1",
        oldEnergy: 4000,
        newEnergy: 2400,
    },
    {
        month: "2",
        oldEnergy: 3000,
        newEnergy: 1398,
    },
    {
        month: "3",
        oldEnergy: 2000,
        newEnergy: 7800,
    },
    {
        month: "4",
        oldEnergy: 5780,
        newEnergy: 3908,
    },
    {
        month: "5",
        oldEnergy: 1890,
        newEnergy: 4800,
    },
    {
        month: "6",
        oldEnergy: 6390,
        newEnergy: 2800,
    },
    {
        month: "7",
        oldEnergy: 3490,
        newEnergy: 4300,
    },
    {
        month: "8",
        oldEnergy: 6490,
        newEnergy: 4300,
    },
    {
        month: "9",
        oldEnergy: 3490,
        newEnergy: 1300,
    },
    {
        month: "10",
        oldEnergy: 3490,
        newEnergy: 4300,
    },
];

function CompareDashboard() {
    return (
        <Row className="align-items-center justify-content-between gx-5">
            <Row className="overflow-x-auto user-select-none justify-content-end">
                <Col md={3}>
                    <Input label="Tủ">
                        <Form.Select aria-label="Default select example">
                            <option value="">Tất cả</option>
                        </Form.Select>
                    </Input>
                </Col>
            </Row>
            <Col md={12}>
                <Row className="justify-content-center">
                    <AreaChart
                        width={
                            data?.length !== 0
                                ? Math.max(data?.length * 60, 820)
                                : "100%"
                        }
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 15,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="coloroldEnergy"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#003caa"
                                    stopOpacity={0.9}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#003caa"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colornewEnergy"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#ffba00"
                                    stopOpacity={0.9}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ffba00"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            xAxisId={0}
                            dy={3}
                            dx={-1}
                            label={{
                                value: "Thời gian",
                                angle: 0,
                                position: "left",
                            }}
                            interval={0}
                            dataKey="month"
                            tickLine={true}
                            tick={{
                                fontSize: 12,
                                angle: 0,
                            }}
                        />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            dataKey="oldEnergy"
                            name="Điện năng cũ"
                            stroke="#003caa"
                            fillOpacity={1}
                            fill="url(#coloroldEnergy)"
                        />
                        <Area
                            dataKey="newEnergy"
                            name="Điện năng mới"
                            stroke="#ffba00"
                            fillOpacity={1}
                            fill="url(#colornewEnergy)"
                        />
                    </AreaChart>
                </Row>
            </Col>
        </Row>
    );
}

export default CompareDashboard;
