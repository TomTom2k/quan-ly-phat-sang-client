import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    Nav,
    Row,
    Tab,
    Tooltip,
    OverlayTrigger,
} from "react-bootstrap";
import Banner from "../components/Banner";
import { images } from "../assets";
import Input from "../components/Input";
import { AuthToken } from "../authToken";
import userApi from "../api/userApi";

import styled from "styled-components";
import analysisApi from "../api/analysisApi";
import LoadingCus from "../components/LoadingCus";
import CombineChart from "../components/dashBoardChart/CombineChart";
import ConsumeChart from "../components/dashBoardChart/ConsumeChart";
import InvoiceChart from "../components/dashBoardChart/InvoiceChart";
import { FaChartBar, FaChartLine, FaChartArea } from "react-icons/fa";
import { BsFillBarChartLineFill } from "react-icons/bs";
import DeviceChart from "../components/dashBoardChart/DeviceChart";

const AsideStyled = styled.div`
    background-color: #fff;
    padding: 0;
    width: 3rem;
    top: 16rem;
    position: sticky;
    top: 0;
`;

const DashBoard = () => {
    const [dataChart, setDataChart] = useState([]);

    const tabs = {
        combine: {
            key: "combine",
            slogan: "Tổng quan",
            banner: images.bgHome,
            icon: <FaChartBar />,
            title: "Biểu đồ kết hợp",
            calculationType: null,
            component: (
                <CombineChart
                    data={dataChart?.data}
                    describe={dataChart?.describe}
                />
            ),
        },
        consume: {
            key: "consume",
            slogan: "Tiêu thụ",
            banner: images.bgData,
            icon: <BsFillBarChartLineFill />,
            title: "Biểu đồ tiêu thụ",
            calculationType: "tongGiaTri",
            component: (
                <ConsumeChart
                    data={dataChart?.data}
                    describe={dataChart?.describe}
                />
            ),
        },
        invoice: {
            key: "invoice",
            slogan: "Hóa đơn",
            banner: images.bgData2,
            icon: <FaChartLine />,
            title: "Biểu đồ hóa đơn",
            calculationType: "tongThanhTien",
            component: (
                <InvoiceChart
                    data={dataChart?.data}
                    describe={dataChart?.describe}
                />
            ),
        },
        device: {
            key: "device",
            slogan: "Thiết bị",
            banner: images.bgData3,
            icon: <FaChartArea />,
            title: "Biểu đồ thiết bị",
            component: <DeviceChart />,
        },
    };
    const { role } = useContext(AuthToken);
    const [tabCurrent, setTabCurrent] = useState(tabs.combine.key);
    // ref of input
    const monthStartRef = useRef(null);
    const monthEndRef = useRef(null);

    // state of input
    const [listDiaPhuonng, setListDiaPhuonng] = useState([]);
    const [selectedDiaPhuonng, setSelectedDiaPhuonng] = useState("");
    const [listKhuVuc, setListKhuVuc] = useState([]);
    const [selectedKhuVuc, setSelectedKhuVuc] = useState("");
    const [listTram, setListTram] = useState([]);
    const [selectedTram, setSelectedTram] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (role) fetchListDiaPhuong();
        fetchListKhuVuc();
        fetchListTram();
    }, [role]);

    useEffect(() => {
        fetchDataChart();
    }, [tabCurrent]);

    // lấy danh sách khu vực
    const fetchListDiaPhuong = async () => {
        try {
            setIsLoading(true);
            const res = await userApi.getDiaPhuong();
            setListDiaPhuonng(res.data.data.user_data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    // lấy danh sách khu vực
    const fetchListKhuVuc = async (userId) => {
        try {
            setIsLoading(true);
            const res = await userApi.getKhuVuc(userId);
            setListKhuVuc(res.data.data.khu_vuc_data);
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
            setListTram(res.data.data.tram_data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    // lấy dữ liệu chart
    const fetchDataChart = async (data) => {
        setIsLoading(true);
        try {
            const res = await analysisApi.ChartKetHop(
                data,
                tabs[tabCurrent].calculationType
            );
            if (res.status === 201) {
                setDataChart(res.data.data);
            }
        } catch (error) {
            console.log("Error query data: ", error);
        }
        setIsLoading(false);
    };

    // submit
    const handlerSubmit = (event) => {
        event.preventDefault();
        const data = {};
        if (selectedDiaPhuonng) data.user_id = selectedDiaPhuonng;
        if (selectedKhuVuc) data.khuVuc = selectedKhuVuc;
        if (selectedTram) data.tram = selectedTram;
        if (monthStartRef.current.value)
            data.monthStart = monthStartRef.current.value;
        if (monthEndRef.current.value)
            data.monthEnd = monthEndRef.current.value;
        fetchDataChart(data);
    };

    const handleChangeDiaPhuong = (e) => {
        setSelectedDiaPhuonng(e.target.value);
        setSelectedKhuVuc("");
        setSelectedTram("");
        if (e.target.value !== "") fetchListKhuVuc(e.target.value);
        else fetchListKhuVuc();
    };
    const handleChangeKhuVuc = (e) => {
        setSelectedKhuVuc(e.target.value);
        setSelectedTram("");
        if (e.target.value !== "") fetchListTram(e.target.value);
        else fetchListTram();
    };
    const handlerChangeTram = (e) => {
        setSelectedTram(e.target.value);
    };

    const handlerSelectAside = (eventKey) => {
        setTabCurrent(eventKey);
    };

    return (
        <>
            <Banner
                image={tabs[tabCurrent].banner}
                title={tabs[tabCurrent].slogan}
            />

            <Container fluid>
                <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey={tabs.combine.key}
                >
                    <Row>
                        {/* aside */}
                        <AsideStyled>
                            <Col className="p-0">
                                <Nav
                                    variant="pills"
                                    className="flex-column position-sticky sticky-top"
                                    onSelect={handlerSelectAside}
                                >
                                    {Object.values(tabs).map((tab) => (
                                        <Nav.Item key={tab && tab.key}>
                                            <OverlayTrigger
                                                placement="right"
                                                x
                                                overlay={
                                                    <Tooltip
                                                        id={`tooltip-${
                                                            tab && tab.key
                                                        }`}
                                                    >
                                                        {tab && tab.title}
                                                    </Tooltip>
                                                }
                                            >
                                                <Nav.Link
                                                    eventKey={tab && tab.key}
                                                    className="rounded-0"
                                                >
                                                    {tab && tab.icon}
                                                </Nav.Link>
                                            </OverlayTrigger>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Col>
                        </AsideStyled>
                        {/* body */}
                        <Col sm={12}>
                            <Container className="mt-2">
                                <Form onSubmit={handlerSubmit}>
                                    <Row className="justify-content-between">
                                        <Col md={12}>
                                            <p className="text-primary h3">
                                                Vị trí truy cập
                                            </p>
                                        </Col>
                                        {role && (
                                            <Col md={2}>
                                                <Input label="Địa phương">
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        onChange={
                                                            handleChangeDiaPhuong
                                                        }
                                                    >
                                                        <option value="">
                                                            Tất cả
                                                        </option>
                                                        {listDiaPhuonng?.map(
                                                            (diaPhuong) => (
                                                                <option
                                                                    key={
                                                                        diaPhuong.user_id
                                                                    }
                                                                    value={
                                                                        diaPhuong.user_id
                                                                    }
                                                                >
                                                                    {
                                                                        diaPhuong.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                </Input>
                                            </Col>
                                        )}
                                        <Col md={5}>
                                            <Input label="Khu vực">
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    onChange={
                                                        handleChangeKhuVuc
                                                    }
                                                >
                                                    <option value="">
                                                        Tất cả
                                                    </option>
                                                    {listKhuVuc?.map(
                                                        (khuvuc) => (
                                                            <option
                                                                key={
                                                                    khuvuc.khu_vuc_id
                                                                }
                                                                value={
                                                                    khuvuc.khu_vuc_id
                                                                }
                                                            >
                                                                {
                                                                    khuvuc.ten_khu_vuc
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Select>
                                            </Input>
                                        </Col>
                                        <Col md={5}>
                                            <Input label="Trạm">
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    onChange={handlerChangeTram}
                                                >
                                                    <option value="">
                                                        Tất cả
                                                    </option>
                                                    {listTram?.map((tram) => (
                                                        <option
                                                            key={tram.tram_id}
                                                            value={tram.tram_id}
                                                        >
                                                            {tram.ten_tram} -{" "}
                                                            {tram.dia_chi}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row className="mt-5">
                                        <Container md={12}>
                                            <p className="text-primary h3">
                                                Thời gian truy cập
                                            </p>
                                        </Container>
                                        <Container md={12}>
                                            <Row className="justify-content-between">
                                                <Col md={3}>
                                                    <Input label="Bắt đầu">
                                                        <Form.Control
                                                            type="month"
                                                            ref={monthStartRef}
                                                        />
                                                    </Input>
                                                </Col>
                                                <Col md={3}>
                                                    <Input label="Kết thúc">
                                                        <Form.Control
                                                            type="month"
                                                            ref={monthEndRef}
                                                        />
                                                    </Input>
                                                </Col>
                                            </Row>
                                        </Container>
                                        <Container md={12}>
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
                                        </Container>
                                    </Row>
                                </Form>
                            </Container>
                            <Container>
                                <Tab.Content>
                                    {Object.values(tabs).map((tab) => (
                                        <Tab.Pane
                                            eventKey={tab.key}
                                            key={tab.key}
                                        >
                                            {tab.component}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Container>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
            {isLoading && <LoadingCus animation="border" variant="secondary" />}
        </>
    );
};

export default DashBoard;
