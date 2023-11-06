import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "w3-css/w3.css";
import styled from "styled-components";

import { images } from "../assets";
import LoadingCus from "../components/LoadingCus";

import AlterCus from "../components/AlterCus";
import Banner from "./../components/Banner";
import OptionQuery from "./../layout/components/OptionQuery";

import {
    AreaChart,
    BarChart,
    BoxPlotChart,
    ComposedAndAGVChart,
    ComposedChart,
    HistogramChart,
    LineChart,
    PieChart,
    SactterChart,
    TreeMapChart,
} from "../components/charts";

const ConsumeDashboardStyle = styled.div`
    .form-control,
    .form-select {
        cursor: pointer;
    }
`;
const WrapperStyled = styled.div`
    position: relative;
`;

const ConsumeDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <ConsumeDashboardStyle>
            <Banner image={images.bgData2} title={"Hóa đơn"} />
            <WrapperStyled>
                <Container fluid="md" className="mt-5">
                    <OptionQuery />
                    <AreaChart />
                    <BarChart />
                    <BoxPlotChart />
                    <ComposedAndAGVChart />
                    <ComposedChart />
                    <HistogramChart />
                    <LineChart />
                    <PieChart />
                    <SactterChart />
                    <TreeMapChart />
                </Container>
                {errorMessage && (
                    <AlterCus variant="danger">{errorMessage}</AlterCus>
                )}
                {isLoading && (
                    <LoadingCus animation="border" variant="secondary" />
                )}
            </WrapperStyled>
        </ConsumeDashboardStyle>
    );
};

export default ConsumeDashboard;
