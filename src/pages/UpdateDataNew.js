import React from "react";

import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { UpdateDataDevice, UpdateDateConsume } from "./updataNew";

const WrapperStyled = styled.div`
    height: calc(100vh - 100px);
    position: relative;
`;

const UpdateDataNew = () => {
    return (
        <WrapperStyled>
            <Container>
                <Row>
                    <Col lg={12}>
                        <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="home" title="Cập nhật dữ liệu mới">
                                <UpdateDateConsume />
                            </Tab>
                            <Tab
                                eventKey="profile"
                                title="Cập nhật dữ liệu thiết bị mới"
                            >
                                <UpdateDataDevice />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </WrapperStyled>
    );
};

export default UpdateDataNew;
