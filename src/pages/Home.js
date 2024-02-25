/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CaretRightFill } from "react-bootstrap-icons";
import styled from "styled-components";

import { images } from "../assets";

const HomeStyles = styled.div``;
const BannerImg = styled.div`
    position: relative;
    height: 22rem;
    width: 100%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        bottom: 0;
        color: #ffff;
        font-size: 2.4rem;
        text-align: center;
        letter-spacing: 2px;
        font-weight: 700;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 11rem;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.65);
        @media (max-width: 600px) {
            display: none;
        }
    }
`;
const BodyStyles = styled.div`
    width: 100%;
`;
const TextStyle = styled.div`
    h3 {
        margin: 0;
        width: auto;
        padding: 2rem 0;
        color: var(--primary);
        font-size: 2rem;
        font-weight: 700;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
    h4 {
        font-weight: 700;
        font-size: 1.4rem;
        color: #0e4e1b;
    }
    h5 {
        color: #0e4e1b;
    }
    p {
        padding-right: 2px;
    }
`;
const LinkStyles = styled.div`
    padding: 0 0 1.5rem 0;
    p,
    a {
        color: rgba(33, 33, 33, 1);
    }
`;

const Home = () => {
    return (
        <HomeStyles className="mb-4">
            <BannerImg>
                <img src={images.bgHome} alt=""></img>
                <p>
                    Nghiên cứu xây dựng công cụ quản lý tiêu thụ năng lượng
                    trong chiếu sáng công cộng tại Việt Nam
                </p>
            </BannerImg>
            <BodyStyles>
                <Container fluid="md">
                    {/* Phần giới thiệu nhiệm vụ */}
                    <Row className="border-bottom border-primary">
                        <Col>
                            <TextStyle>
                                <h3>Giới thiệu nhiệm vụ</h3>
                                <p>
                                    Trang web này có nhiệm vụ chính là tính toán
                                    và theo dõi tiền điện tiêu thụ của các cột
                                    đèn đường trên toàn quốc. Chúng tôi cung cấp
                                    một giao diện dễ sử dụng cho việc quản lý
                                    các thông tin quan trọng sau:
                                </p>
                                <Row>
                                    <h5>Thu thập dữ liệu:</h5>
                                    <Col type="a" start="1">
                                        <p>
                                            <CaretRightFill
                                                size={10}
                                                color="#36c136"
                                                className="m-2"
                                            />
                                            Thu thập dữ liệu về mức độ chiếu
                                            sáng ở các vị trí khác nhau trên
                                            toàn quốc.
                                        </p>

                                        <p>
                                            <CaretRightFill
                                                size={10}
                                                color="#36c136"
                                                className="m-2"
                                            />
                                            Ghi nhận các thông số kỹ thuật liên
                                            quan đến ánh sáng, chẳng hạn như
                                            cường độ, loại đèn sử dụng, và nguồn
                                            cung cấp ánh sáng.
                                        </p>
                                    </Col>
                                    <h5>Xây dựng hệ thống ghi dữ liệu:</h5>
                                    <Row type="a" start="1">
                                        <Col>
                                            <p>
                                                <CaretRightFill
                                                    size={10}
                                                    color="#36c136"
                                                    className="m-2"
                                                />
                                                Phát triển hệ thống quản lý dữ
                                                liệu để lưu trữ thông tin về
                                                chiếu sáng được thu thập.
                                            </p>
                                            <p>
                                                <CaretRightFill
                                                    size={10}
                                                    color="#36c136"
                                                    className="m-2"
                                                />
                                                Đảm bảo tính bảo mật và quyền
                                                riêng tư của dữ liệu được thu
                                                thập.
                                            </p>
                                        </Col>
                                    </Row>
                                    <h5>Hiển thị dữ liệu:</h5>
                                    <Row type="a" start="1">
                                        <Col>
                                            <p>
                                                <CaretRightFill
                                                    size={10}
                                                    color="#36c136"
                                                    className="m-2"
                                                />
                                                Tạo giao diện trang web để hiển
                                                thị dữ liệu về chiếu sáng theo
                                                các biểu đồ, bản đồ và báo cáo
                                                thống kê.
                                            </p>
                                            <p>
                                                <CaretRightFill
                                                    size={10}
                                                    color="#36c136"
                                                    className="m-2"
                                                />
                                                Cho phép người dùng tìm kiếm và
                                                so sánh dữ liệu chiếu sáng ở các
                                                vị trí khác nhau.
                                            </p>
                                        </Col>
                                    </Row>
                                    <h5>Thúc đẩy nghiên cứu và phân tích:</h5>
                                    <Row type="a" start="1">
                                        <Col>
                                            <p>
                                                <CaretRightFill
                                                    size={10}
                                                    color="#36c136"
                                                    className="m-2"
                                                />
                                                Cung cấp công cụ để phân tích số
                                                liệu chiếu sáng.
                                            </p>
                                            <p>
                                                <CaretRightFill
                                                    size={10}
                                                    color="#36c136"
                                                    className="m-2"
                                                />
                                                Hỗ trợ việc nghiên cứu và đánh
                                                giá tác động của ánh sáng đối
                                                với môi trường và sức khỏe con
                                                người.
                                            </p>
                                        </Col>
                                    </Row>
                                    <p>
                                        Mục tiêu của trang web này là cung cấp
                                        thông tin chính xác, hữu ích và hỗ trợ
                                        trong việc quản lý chiếu sáng và hiểu rõ
                                        tác động của nó đối với môi trường và xã
                                        hội.
                                    </p>
                                </Row>
                            </TextStyle>
                            {/* <LinkStyles>
                                <p>
                                    1. <a href="#">Thông tư ABC</a>
                                </p>
                                <p>
                                    2. <a href="#">Quyến đinh 123</a>
                                </p>
                                <p>
                                    3. <a href="#">Văn bản 456</a>
                                </p>
                            </LinkStyles> */}
                        </Col>
                    </Row>
                    {/* Phần tổng quan web */}
                    <Row className="border-bottom border-primary">
                        <Col>
                            <TextStyle>
                                <h3>Tổng quan về quản lý chiếu sáng</h3>
                                <Row>
                                    <Col lg={12}>
                                        <Row className="gx-5">
                                            <Col lg={4}>
                                                <Row className="mb-2">
                                                    <h4>Trang chủ</h4>
                                                    <p>
                                                        Trang chủ của trang web
                                                        là điểm xuất phát, nơi
                                                        chúng tôi trình bày
                                                        nhiệm vụ quan trọng của
                                                        trang web, cung cấp
                                                        thông tin về các thông
                                                        tư, quyết định và văn
                                                        bản của Bộ liên quan đến
                                                        quản lý điện năng tiêu
                                                        thụ đèn đường. Trang chủ
                                                        cũng cung cấp một cái
                                                        nhìn tổng quan về chức
                                                        năng và mục tiêu của
                                                        trang web để giúp người
                                                        dùng hiểu rõ hơn về ý đồ
                                                        và lợi ích của dự án.
                                                        <br />
                                                        <br />
                                                        Ngoài ra, trang chủ cung
                                                        cấp một phần hướng dẫn
                                                        sử dụng web, giúp người
                                                        dùng mới tìm hiểu cách
                                                        thao tác trên trang web
                                                        để truy cập và sử dụng
                                                        dữ liệu liên quan đến
                                                        điện năng tiêu thụ và
                                                        đèn đường.
                                                    </p>
                                                </Row>
                                                <Row>
                                                    <h4>Đăng Nhập</h4>
                                                    <p>
                                                        Để truy cập và sử dụng
                                                        các chức năng của trang
                                                        web, người dùng cần đăng
                                                        nhập bằng tài khoản và
                                                        mật khẩu của họ. Quá
                                                        trình đăng nhập đảm bảo
                                                        tính bảo mật của dữ liệu
                                                        và thông tin quản lý.
                                                    </p>
                                                </Row>
                                            </Col>
                                            <Col lg={8}>
                                                <h4>Dữ Liệu trang web</h4>
                                                <ol>
                                                    <Row>
                                                        <Col lg={12}>
                                                            <li>
                                                                Cập Nhật Dữ Liệu
                                                                <p>
                                                                    Trang "Cập
                                                                    Nhật Dữ
                                                                    Liệu" cho
                                                                    phép người
                                                                    dùng cập
                                                                    nhật các
                                                                    thông tin
                                                                    quan trọng
                                                                    như:
                                                                </p>
                                                            </li>
                                                            <ul>
                                                                <li>
                                                                    Lượng Điện
                                                                    Năng Tiêu
                                                                    Thụ: Người
                                                                    dùng có thể
                                                                    cập nhật
                                                                    thông tin về
                                                                    lượng điện
                                                                    năng tiêu
                                                                    thụ trong
                                                                    tháng cho
                                                                    từng tỉnh
                                                                    thành trong
                                                                    cả nước.
                                                                    Điều này cho
                                                                    phép quản lý
                                                                    theo dõi và
                                                                    thống kê
                                                                    lượng tiêu
                                                                    thụ đèn
                                                                    đường theo
                                                                    thời gian.
                                                                </li>
                                                                <li>
                                                                    Số Bóng Đèn
                                                                    Đường: Thông
                                                                    tin về số
                                                                    lượng bóng
                                                                    đèn đường sẽ
                                                                    được cập
                                                                    nhật, cho
                                                                    phép theo
                                                                    dõi và quản
                                                                    lý tình
                                                                    trạng thiết
                                                                    bị chiếu
                                                                    sáng trên
                                                                    đường phố.
                                                                </li>
                                                                <li>
                                                                    Tiền Điện:
                                                                    Tính toán và
                                                                    cập nhật
                                                                    thông tin về
                                                                    tiền điện dự
                                                                    kiến được sử
                                                                    dụng trong
                                                                    tháng dựa
                                                                    trên dữ liệu
                                                                    tiêu thụ
                                                                    điện năng và
                                                                    mức giá điện
                                                                    hiện hành.
                                                                </li>
                                                            </ul>
                                                        </Col>
                                                        <Row className="pt-4">
                                                            <Col>
                                                                <li>
                                                                    Dữ Liệu Tiêu
                                                                    Thụ
                                                                </li>
                                                                <p>
                                                                    Trang "Dữ
                                                                    Liệu Tiêu
                                                                    Thụ" chứa
                                                                    thông tin về
                                                                    lượng điện
                                                                    tiêu thụ
                                                                    trong tháng
                                                                    tại mỗi tỉnh
                                                                    thành trên
                                                                    toàn quốc.
                                                                    Dữ liệu này
                                                                    cho phép
                                                                    người dùng
                                                                    xem thống kê
                                                                    và phân tích
                                                                    xu hướng
                                                                    tiêu thụ để
                                                                    đưa ra các
                                                                    quyết định
                                                                    quản lý hiệu
                                                                    quả về đèn
                                                                    đường.
                                                                </p>
                                                            </Col>
                                                            <Col>
                                                                <li>
                                                                    Dữ Liệu Hóa
                                                                    Đơn
                                                                </li>
                                                                <p>
                                                                    Trang "Dữ
                                                                    Liệu Hóa
                                                                    Đơn" bao gồm
                                                                    thông tin về
                                                                    hóa đơn tiền
                                                                    điện của
                                                                    từng tháng.
                                                                    Người dùng
                                                                    có thể xem
                                                                    và tải xuống
                                                                    hóa đơn của
                                                                    họ từ trang
                                                                    này. Hóa đơn
                                                                    này dựa trên
                                                                    dữ liệu tiêu
                                                                    thụ điện
                                                                    năng và giá
                                                                    điện tương
                                                                    ứng.
                                                                </p>
                                                            </Col>
                                                            <Col>
                                                                <li>
                                                                    Dữ Liệu
                                                                    Thiết Bị
                                                                </li>
                                                                <p>
                                                                    Trang "Dữ
                                                                    Liệu Thiết
                                                                    Bị" cho phép
                                                                    người dùng
                                                                    theo dõi số
                                                                    lượng thiết
                                                                    bị phát sáng
                                                                    (bóng đèn
                                                                    đường) cùng
                                                                    với các loại
                                                                    đèn khác
                                                                    nhau. Điều
                                                                    này giúp
                                                                    quản lý tình
                                                                    trạng và cải
                                                                    thiện hiệu
                                                                    suất của
                                                                    thiết bị
                                                                    chiếu sáng
                                                                    trên đường
                                                                    phố.
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </ol>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </TextStyle>
                        </Col>
                    </Row>
                    {/* phần Hướng dẫn sử dụng */}
                    <Row className="border-bottom border-primary">
                        <Col>
                            <TextStyle>
                                <h3>Hướng dẫn sử dụng</h3>
                            </TextStyle>
                            <LinkStyles>
                                <p>
                                    <a href="#">
                                        Tải tài liệu hướng dẫn sử dụng.
                                    </a>
                                </p>
                            </LinkStyles>
                        </Col>
                    </Row>
                </Container>
            </BodyStyles>
        </HomeStyles>
    );
};

export default Home;
