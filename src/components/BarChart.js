import React from "react";
import { Row, Col } from "react-bootstrap";

import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
    BarChart,
    Rectangle,
} from "recharts";

const BarCharts = () => {
    return (
        <Row className="mt-5">
            <Col lg={12}>
                <BarChart
                    width={800}
                    height={300}
                    data={null}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ngay_do__month" fontSize={10} />
                    <YAxis fontSize={10} />

                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar
                        name="Điện năng"
                        dataKey="tong_gia_tri"
                        fill="#F66161"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                    <Bar
                        name="Tổng tiền"
                        dataKey={(dataChart) =>
                            dataChart.tong_thanh_tien / 1000
                        }
                        fill="#39BF5A"
                        activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                </BarChart>
                <Col lg={8} className="text-center r-2">
                    <p>
                        BIểu đồ thể hiện lượng điện năng tiêu thụ và thành tiền
                        theo năm
                    </p>
                </Col>
            </Col>
        </Row>
    );
};
export default BarCharts;
