import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Container, Button, Form, Table } from "react-bootstrap";
import fileApi from "./../../api/fileApi";
import { files } from "../../assets";
import AlterCus from "./../../components/AlterCus";
import LoadingCus from "./../../components/LoadingCus";
const TitleStyled = styled.h4`
    color: var(--primary);
`;
const FullWidthButton = styled(Button)`
    width: 100%;
`;
const renderTable = (sheet) => {
    const cols = Object.keys(sheet);

    return (
        <Table striped bordered hover size="sm" responsive>
            <thead>
                <tr>
                    {cols.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {cols.map((col, colIndex) => (
                            <td key={colIndex}>{sheet[col][rowIndex]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const UpdateDateConsume = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [data, setData] = useState(null);
    const [sheet, setSheet] = useState(0);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setShowError(true);
            setTimeout(() => setShowError(false), 1000);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fileApi.uploadExcel(selectedFile);
            setData(response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
        setIsLoading(false);
    };
    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Row>
                            <Col>
                                <TitleStyled>Cập nhật dữ liệu mới</TitleStyled>
                                <p>
                                    Tải lên file dữ liệu hoàn chỉnh để tiến hành
                                    lưu trữ
                                </p>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Control
                                            type="file"
                                            className="w-50"
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="mt-4"
                                    >
                                        Upload file hoàn chỉnh
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <div className="d-grid gap-2">
                            <TitleStyled>Dữ liệu mẫu</TitleStyled>
                            <p>
                                Tải về dữ liệu mẫu để tham khảo và nhập liệu và
                                Excel template được cho sẵn
                            </p>
                            <a href={files.nullTemp} download>
                                <FullWidthButton variant="outline-primary">
                                    Download Excel template
                                </FullWidthButton>
                            </a>
                            <a href={files.nullTemp} download>
                                <FullWidthButton variant="outline-primary">
                                    Download dữ liệu mẫu
                                </FullWidthButton>
                            </a>
                        </div>
                    </Col>
                </Row>
                {data?.file && (
                    <>
                        <Row className="mt-2">
                            <Col md={4}>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={(e) => setSheet(e.target.value)}
                                >
                                    {data.file.map((sheet, index) => (
                                        <option value={index} key={index}>
                                            sheet {index + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            {renderTable(data.file[sheet])}
                        </Row>
                    </>
                )}
            </Container>
            {showError && (
                <AlterCus variant="danger">
                    Vui lòng chọn file để tải lên
                </AlterCus>
            )}
            {isLoading && (
                <LoadingCus animation="border" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </LoadingCus>
            )}
        </>
    );
};

export default UpdateDateConsume;
