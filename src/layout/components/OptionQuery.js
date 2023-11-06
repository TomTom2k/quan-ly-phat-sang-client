import React, { useState, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";

const TitleStyled = styled.h3`
    margin: 0;
    width: 30%;
    color: var(--primary);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.56;
`;

const OptionQuery = () => {
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dayRef = useRef(null);
    return (
        <Container>
            <TitleStyled className="mb-2">Thời gian truy cập</TitleStyled>
            <Row className="justify-content-between">
                <Col md={3}>
                    <b>Năm</b>
                    <Form.Control type="number" ref={yearRef}></Form.Control>
                </Col>
                <Col md={3}>
                    <b>Tháng</b>
                    <Form.Control type="number" ref={monthRef}></Form.Control>
                </Col>
                <Col md={3}>
                    <b>Ngày</b>
                    <Form.Control type="number" ref={dayRef}></Form.Control>
                </Col>
            </Row>
        </Container>
    );
};

export default OptionQuery;
