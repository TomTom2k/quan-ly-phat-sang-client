import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

import { images } from "../assets";
import LoadingCus from "../components/LoadingCus";
import AlterCus from "../components/AlterCus";

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

import Banner from "../components/Banner";
import OptionQuery from "../layout/components/OptionQuery";

const WrapperStyled = styled.div`
    position: relative;
`;

const ConsumeDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <>
            <Banner image={images.bgData} title={"Tiêu thụ"} />
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
        </>
    );
};

export default ConsumeDashboard;
