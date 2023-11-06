import React from "react";
import { Row, Col} from "react-bootstrap";

import {
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

const AreaChartCus = () => {
    return (
        <Row className="mt-5">
            <Col>
                <AreaChart
                    width={730}
                    height={250}
                    data={null}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
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
                        <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
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
                    <XAxis dataKey="ngay_do__month" fontSize={10} />
                    <YAxis />
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
                    <Area
                        type="monotone"
                        name="Tổng tiền"
                        dataKey={(dataChart) =>
                            dataChart?.tong_thanh_tien / 1000
                        }
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                    />
                </AreaChart>
                <Col lg={8} className="text-center r-2">
                    <p>
                        BIểu đồ thể hiện lượng điện năng tiêu thụ và thành tiền
                    </p>
                </Col>
            </Col>
        </Row>
    );
};
export default AreaChartCus;
