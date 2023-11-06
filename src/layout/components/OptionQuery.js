import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "w3-css/w3.css";
import styled from "styled-components";

import { AuthToken } from "../../authToken";
import userApi from "./../../api/userApi";
import analysisApi from "./../../api/analysisApi";

const TitleStyled = styled.h3`
    margin: 0;
    width: 30%;
    color: var(--primary);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.56;
`;

const OptionQuery = ({}) => {
    const { role } = useContext(AuthToken);
    const diaPhuongRef = useRef(null);
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dayRef = useRef(null);

    const [listKhuVuc, setListKhuVuc] = useState([]);
    const [selectedKhuVuc, setSelectedKhuVuc] = useState("");

    const [listTram, setListTram] = useState([]);
    const [selectedTram, setSelectedTram] = useState("");

    const [dataChart, setDataChart] = useState(null);
    const [barsName, setBarsName] = useState("ngay_do__year");
    const [describe, setDescribe] = useState(null);
    const [showDes, setShowDes] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchListKhuVuc();
        fetchListTram();
    }, []);

    // lấy danh sách khu vực
    const fetchListKhuVuc = async () => {
        try {
            setIsLoading(true);
            const res = await userApi.getKhuVuc();
            setListKhuVuc(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    // lấy danh sách trạm
    const fetchListTram = async (tramId) => {
        try {
            setIsLoading(true);
            const res = await userApi.getTram(tramId);
            setListTram(res.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleChangeKhuVuc = (e) => {
        setSelectedKhuVuc(e.target.value);
        setSelectedTram("-1");
        if (e.target.value !== "-1") fetchListTram(e.target.value);
        else fetchListTram();
    };

    const handlerChangeTram = (e) => {
        setSelectedTram(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = {};

        if (yearRef.current.value) {
            setBarsName("ngay_do__month");
            data.nam = yearRef.current.value;
            if (monthRef.current.value) {
                setBarsName("ngay_do__day");
                data.thang = monthRef.current.value;
            }
        }
        if (selectedKhuVuc) data.khuVuc = selectedKhuVuc;
        if (selectedTram) data.tram = selectedTram;

        try {
            const res = await analysisApi.chartDienNangTieuThuThanhTien(data);
            console.log(data);
            if (res.data) {
                setDataChart(res.data.data);
                setDescribe(res.data.describe);
                console.log(res.data.describe);
            } else {
                setDataChart(null);
                setDescribe(null);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);

            setErrorMessage("Truy vấn không thành công");
            setTimeout(() => setErrorMessage(""), 2000);
        }
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <TitleStyled className="mt-5 mb-2">
                            Thời gian truy cập
                        </TitleStyled>
                        <Row className="justify-content-between">
                            <Col md={4}>
                                <p>Ngày bắt đầu</p>
                                <input type="date" ref={yearRef} />
                            </Col>
                            <Col>
                                <p>Ngày kết thúc</p>
                                <input type="date" ref={yearRef} />
                            </Col>
                        </Row>
                        <TitleStyled className="mt-4 mb-2">
                            Khu vực truy cập
                        </TitleStyled>
                        {role && (
                            <Row className="justify-content-md">
                                <Col xs lg="5">
                                    <Form.Select
                                        aria-label="Default select example"
                                        ref={diaPhuongRef}
                                    >
                                        <option hidden>Địa phương</option>
                                        <option value="1">Cần Thơ</option>
                                        <option value="2">Đà Nẵng</option>
                                        <option value="3">Nha Trang</option>
                                        <option value="3">
                                            Thành phố Hồ Chí Minh
                                        </option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        )}
                        <Row className="mt-4">
                            <Col md={5}>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChangeKhuVuc}
                                >
                                    <option hidden>Khu vực</option>
                                    <option value="-1">Tất cả</option>
                                    {listKhuVuc.map((khuvuc) => (
                                        <option
                                            key={khuvuc.khu_vuc_id}
                                            value={khuvuc.khu_vuc_id}
                                        >
                                            {khuvuc.ten_khu_vuc}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={{ span: 5, offset: 2 }}>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handlerChangeTram}
                                >
                                    <option value="" hidden>
                                        Trạm
                                    </option>
                                    {listTram.map((tram) => (
                                        <option
                                            key={tram.tram_id}
                                            value={tram.tram_id}
                                        >
                                            {tram.ten_tram} - {tram.dia_chi}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="justify-content-end border-top mt-5">
                            <Col md={2}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="mt-5 w-100"
                                >
                                    Truy cập
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default OptionQuery;
