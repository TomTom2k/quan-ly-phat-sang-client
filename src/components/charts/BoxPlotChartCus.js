import React from "react";
import { Row, Col } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

const data6 = [
    {
        type: "boxPlot",
        data: [
            {
                x: "Jan 2015",
                y: [54, 66, 69, 75, 88],
            },
            {
                x: "Jan 2016",
                y: [43, 65, 69, 76, 81],
            },
            {
                x: "Jan 2017",
                y: [31, 39, 45, 51, 59],
            },
            {
                x: "Jan 2018",
                y: [39, 46, 55, 65, 71],
            },
            {
                x: "Jan 2019",
                y: [29, 31, 35, 39, 44],
            },
            {
                x: "Jan 2020",
                y: [41, 49, 58, 61, 67],
            },
            {
                x: "Jan 2021",
                y: [54, 59, 66, 71, 88],
            },
        ],
    },
];

const options = {
    chart: {
        type: "boxPlot",
        height: 350,
    },
    title: {
        text: "BoxPlot",
        align: "middle",
    },
};

const BoxPlotChartCus = () => {
    return (
        <Row className="mt-5">
            <Col>
                <ReactApexChart
                    options={options}
                    series={data6}
                    type="boxPlot"
                    width={850}
                    height={350}
                />
            </Col>
        </Row>
    );
};
export default BoxPlotChartCus;
