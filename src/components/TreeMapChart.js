import React from "react";
import { Row, Col } from "react-bootstrap";

import { Treemap } from "recharts";

const data3 = [
    {
        name: "Tháng 1",
        children: [{ name: "Tháng 1", size: 24593 }],
    },
    {
        name: "Tháng 2",
        children: [{ name: "Tháng 2", size: 8435 }],
    },
    {
        name: "Tháng 3",
        children: [{ name: "Tháng 3", size: 20544 }],
    },
    {
        name: "Tháng 4",
        children: [{ name: "Tháng 4", size: 7313 }],
    },
    {
        name: "Tháng 5",
        children: [{ name: "Tháng 5", size: 20859 }],
    },
    {
        name: "Tháng 6",
        children: [{ name: "Tháng 6", size: 100859 }],
    },
    {
        name: "Tháng 7",
        children: [{ name: "Tháng 7", size: 70859 }],
    },
    {
        name: "Tháng 8",
        children: [{ name: "Tháng 8", size: 90859 }],
    },
    {
        name: "Tháng 9",
        children: [{ name: "Tháng 9", size: 30859 }],
    },
    {
        name: "Tháng 10",
        children: [{ name: "Tháng 10", size: 90859 }],
    },
    {
        name: "Tháng 11",
        children: [{ name: "Tháng 11", size: 100859 }],
    },
    {
        name: "Tháng 12",
        children: [{ name: "Tháng 12", size: 80859 }],
    },
];

const TreeMapChart = () => {
    return (
        <Row className="mt-5">
            <Col>
                <Treemap
                    width={800}
                    height={300}
                    data={data3}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                />
                <Col lg={8} className="text-center r-2">
                    <p>
                        BIểu đồ thể hiện lượng điện năng tiêu thụ theo
                        tháng(Kwh)
                    </p>
                </Col>
            </Col>
        </Row>
    );
};
export default TreeMapChart;
