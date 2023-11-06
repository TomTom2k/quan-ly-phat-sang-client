import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import styled from "styled-components";

import { images } from "../assets";
import LoadingCus from "../components/LoadingCus";

import {
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
    Line,
    Rectangle,
} from "recharts";
import userApi from "../api/userApi";
import analysisApi from "../api/analysisApi";
import AlterCus from "../components/AlterCus";

const ConsumeDashboardStyle = styled.div`
    .form-control,
    .form-select {
        cursor: pointer;
    }
`;
const BannerImgCD = styled.div`
    position: relative;
    height: 12rem;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        bottom: 0;
        color: white;
        align-items: center;
        font-size: 2.2rem;
        text-align: center;
        letter-spacing: 2px;
        font-weight: 700;
        line-height: 2.5;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10rem;
        margin: 0;
    }
`;
const WrapperStyled = styled.div`
    position: relative;
`;
const TitleStyled = styled.h3`
    margin: 0;
    width: 30%;
    color: var(--primary);
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.56;
`;
const FooterStyle = styled.div`
    width: 100%;
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(33, 33, 33, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
`;

const ConsumeDashboard = () => {
    const role = JSON.parse(Cookies.get("role"));
    const diaPhuongRef = useRef(null);
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dayRef = useRef(null);

    const [listKhuVuc, setListKhuVuc] = useState([]);
    const [selectedKhuVuc, setSelectedKhuVuc] = useState("");

    const [listTram, setListTram] = useState([]);
    const [selectedTram, setSelectedTram] = useState("");

    const [dataChart, setDataChart] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchListKhuVuc();
        fetchListTram();
    }, []);

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

    const fetchListTram = async (tramId) => {
        try {
            setIsLoading(true);
            const res = await userApi.getTram(tramId);
            setListTram(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleChangeKhuVuc = (e) => {
        setSelectedKhuVuc(e.target.value);
        if (e.target.value !== "-1") fetchListTram(e.target.value);
        else fetchListTram();
    };

    const handlerChangeTram = (e) => {
        setSelectedKhuVuc(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedKhuVuc) {
            setIsLoading(true);
            const data = {
                nam: yearRef.current.value,
                khuVuc: selectedKhuVuc,
                tram: selectedTram,
            };

            try {
                console.log(selectedKhuVuc);
                const res = await analysisApi.chartDienNangTieuThuThanhTien(
                    data
                );
                console.log(res);
                setDataChart(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        } else {
            setErrorMessage("Vui lòng chọn khu vực");
            setTimeout(() => setErrorMessage(""), 1000);
        }
    };

    return (
        <ConsumeDashboardStyle>
            <BannerImgCD>
                <img src={images.bgData2} alt=""></img>
                <p>Hóa đơn</p>
            </BannerImgCD>
            <WrapperStyled>
                <Container fluid="md" className="mt-5">
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <TitleStyled className="mb-2">
                                    Thời gian truy cập
                                </TitleStyled>
                                <Row className="justify-content-between">
                                    <Col md={3}>
                                        <b>Năm</b>
                                        <Form.Control
                                            type="number"
                                            ref={yearRef}
                                        ></Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <b>Tháng</b>
                                        <Form.Control
                                            type="number"
                                            ref={monthRef}
                                        ></Form.Control>
                                    </Col>
                                    <Col md={3}>
                                        <b>Ngày</b>
                                        <Form.Control
                                            type="number"
                                            ref={dayRef}
                                        ></Form.Control>
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
                                                <option hidden>
                                                    Địa phương
                                                </option>
                                                <option value="1">
                                                    Cần Thơ
                                                </option>
                                                <option value="2">
                                                    Đà Nẵng
                                                </option>
                                                <option value="3">
                                                    Nha Trang
                                                </option>
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
                                                    {tram.ten_tram} -{" "}
                                                    {tram.dia_chi}
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
                    {dataChart && (
                        <Row>
                            <Row>
                                <Col lg={12}>
                                    <ComposedChart
                                        width={830}
                                        height={300}
                                        data={dataChart}
                                    >
                                        <XAxis
                                            dataKey="ngay_do__month"
                                            fontSize={10}
                                        ></XAxis>
                                        <YAxis fontSize={10} />
                                        <Tooltip />
                                        <Legend
                                            verticalAlign="top"
                                            height={36}
                                        />
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <Bar
                                            name="Điện năng"
                                            dataKey="tong_gia_tri"
                                            fill="#FFA500"
                                            activeBar={
                                                <Rectangle
                                                    fill="pink"
                                                    stroke="blue"
                                                />
                                            }
                                        />
                                        <Bar
                                            name="Tổng tiền"
                                            dataKey={(dataChart) =>
                                                dataChart.tong_thanh_tien / 1000
                                            }
                                            fill="#41AD4B"
                                            activeBar={
                                                <Rectangle
                                                    fill="gold"
                                                    stroke="purple"
                                                />
                                            }
                                        />
                                        <Line
                                            name="Điện năng"
                                            type="monotone"
                                            dataKey="tong_gia_tri"
                                            stroke="#CC3333"
                                        />
                                    </ComposedChart>
                                    <Col lg={8} className="text-center r-2">
                                        <p>
                                            BIểu đồ thể hiện lượng điện năng
                                            tiêu thụ và thành tiền theo năm
                                        </p>
                                    </Col>
                                </Col>
                            </Row>
                        </Row>
                    )}
                </Container>
                {errorMessage && (
                    <AlterCus variant="danger">{errorMessage}</AlterCus>
                )}
                {isLoading && (
                    <LoadingCus animation="border" variant="secondary" />
                )}
            </WrapperStyled>
            <WrapperStyled>
                <Container
                    fluid="md"
                    className="mt-5 border-top border-primary"
                >
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
                                                <option hidden>
                                                    Địa phương
                                                </option>
                                                <option value="1">
                                                    Cần Thơ
                                                </option>
                                                <option value="2">
                                                    Đà Nẵng
                                                </option>
                                                <option value="3">
                                                    Nha Trang
                                                </option>
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
                                                    {tram.ten_tram} -{" "}
                                                    {tram.dia_chi}
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
                    {dataChart && (
                        <Row>
                            <Row>
                                <Col lg={12}>
                                    <ComposedChart
                                        width={830}
                                        height={300}
                                        data={dataChart}
                                    >
                                        <XAxis
                                            dataKey="ngay_do__month"
                                            fontSize={10}
                                        ></XAxis>
                                        <YAxis fontSize={10} />
                                        <Tooltip />
                                        <Legend
                                            verticalAlign="top"
                                            height={36}
                                        />
                                        <CartesianGrid stroke="#f5f5f5" />
                                        <Bar
                                            name="Điện năng"
                                            dataKey="tong_gia_tri"
                                            fill="#FFA500"
                                            activeBar={
                                                <Rectangle
                                                    fill="pink"
                                                    stroke="blue"
                                                />
                                            }
                                        />
                                        <Bar
                                            name="Tổng tiền"
                                            dataKey={(dataChart) =>
                                                dataChart.tong_thanh_tien / 1000
                                            }
                                            fill="#41AD4B"
                                            activeBar={
                                                <Rectangle
                                                    fill="gold"
                                                    stroke="purple"
                                                />
                                            }
                                        />
                                        <Line
                                            name="Điện năng"
                                            type="monotone"
                                            dataKey="tong_gia_tri"
                                            stroke="#CC3333"
                                        />
                                    </ComposedChart>
                                    <Col lg={8} className="text-center r-2">
                                        <p>
                                            BIểu đồ thể hiện lượng điện năng
                                            tiêu thụ và thành tiền theo năm
                                        </p>
                                    </Col>
                                </Col>
                            </Row>
                        </Row>
                    )}
                </Container>
                {errorMessage && (
                    <AlterCus variant="danger">{errorMessage}</AlterCus>
                )}
                {isLoading && (
                    <LoadingCus animation="border" variant="secondary" />
                )}
            </WrapperStyled>
            <FooterStyle>
                <p>
                    Bản quyền © 2023 thuộc về Trường Đại Học Kiến Trúc Thành phố
                    Hồ Chí Minh
                </p>
            </FooterStyle>
        </ConsumeDashboardStyle>
    );
};

export default ConsumeDashboard;
