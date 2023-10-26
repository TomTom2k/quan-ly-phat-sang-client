/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styled from "styled-components";

import { images } from "../assets";

const HomeStyles = styled.div``;
const BannerImg = styled.div`
  position: relative;
  height: 18rem;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    bottom: 0;
    color: #fff;
    align-items: center;
    font-size: 2.2rem;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 600;
    line-height: 1.5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 11rem;
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
    color: #00bc00;
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.56;
  }
  h4 {
    font-weight: 700;
    font-size: 1.4rem;
  }
  p {
    margin: 0;
    color: rgba(33, 33, 33, 1);
    font-size: 1.05rem;
    font-weight: 400;
    line-height: 1.56;
  }
`;
const LinkStyles = styled.div`
  padding: 1.5rem 0;
  width: 30%;
  p,
  a {
    color: rgba(33, 33, 33, 1);
    padding-bottom: 0.4rem;
  }
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

const Home = () => {
  return (
    <HomeStyles>
      <BannerImg>
        <img src={images.bgHome} alt=""></img>
        <p>
          Nghiên cứu xây dựng công cụ quản lý tiêu thụ năng lượng trong chiếu
          sáng công cộng tại Việt Nam
        </p>
      </BannerImg>
      <BodyStyles>
        <Container fluid="md">
          <Row className="justify-content-md-center">
            <Col lg="10">
              {/* Phần giới thiệu nhiệm vụ */}
              <TextStyle>
                <h3>Giới thiệu nhiệm vụ</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </TextStyle>
              <LinkStyles>
                <p>
                  1. <a href="#">Thông tư ABC</a>
                </p>
                <p>
                  2. <a href="#">Quyến đinh 123</a>
                </p>
                <p>
                  3. <a href="#">Văn bản 456</a>
                </p>
              </LinkStyles>
              {/* Phần tổng quan web */}
              <TextStyle>
                <h3>Tổng quan về quản lý chiếu sáng</h3>
                <h4>Trang chủ</h4>
                <p>
                Trang chủ của trang web là điểm xuất phát, nơi chúng tôi trình bày nhiệm vụ quan trọng của trang web, cung cấp thông tin về các thông tư, quyết định và văn bản của Bộ liên quan đến quản lý điện năng tiêu thụ đèn đường. Trang chủ cũng cung cấp một cái nhìn tổng quan về chức năng và mục tiêu của trang web để giúp người dùng hiểu rõ hơn về ý đồ và lợi ích của dự án.<br />
                <br />Ngoài ra, trang chủ cung cấp một phần hướng dẫn sử dụng web, giúp người dùng mới tìm hiểu cách thao tác trên trang web để truy cập và sử dụng dữ liệu liên quan đến điện năng tiêu thụ và đèn đường.
                </p>
                <h4>Dữ Liệu</h4>
                <ol>
                  <li>Cập Nhật Dữ Liệu</li>
                  <p>Trang "Cập Nhật Dữ Liệu" cho phép người dùng cập nhật các thông tin quan trọng như:</p>
                    <ul>
                      <li>Lượng Điện Năng Tiêu Thụ: Người dùng có thể cập nhật thông tin về lượng điện năng tiêu thụ trong tháng cho từng tỉnh thành trong cả nước. Điều này cho phép quản lý theo dõi và thống kê lượng tiêu thụ đèn đường theo thời gian.</li>
                      <li>Số Bóng Đèn Đường: Thông tin về số lượng bóng đèn đường sẽ được cập nhật, cho phép theo dõi và quản lý tình trạng thiết bị chiếu sáng trên đường phố. </li>
                      <li>Tiền Điện: Tính toán và cập nhật thông tin về tiền điện dự kiến được sử dụng trong tháng dựa trên dữ liệu tiêu thụ điện năng và mức giá điện hiện hành.</li>
                    </ul>
                  <li>Dữ Liệu Tiêu Thụ</li>
                  <p>Trang "Dữ Liệu Tiêu Thụ" chứa thông tin về lượng điện tiêu thụ trong tháng tại mỗi tỉnh thành trên toàn quốc. Dữ liệu này cho phép người dùng xem thống kê và phân tích xu hướng tiêu thụ để đưa ra các quyết định quản lý hiệu quả về đèn đường.</p>
                  <li>Dữ Liệu Hóa Đơn</li>
                    <p>Trang "Dữ Liệu Hóa Đơn" bao gồm thông tin về hóa đơn tiền điện của từng tháng. Người dùng có thể xem và tải xuống hóa đơn của họ từ trang này. Hóa đơn này dựa trên dữ liệu tiêu thụ điện năng và giá điện tương ứng.</p>
                  <li>Dữ Liệu Thiết Bị</li>
                    <p>Trang "Dữ Liệu Thiết Bị" cho phép người dùng theo dõi số lượng thiết bị phát sáng (bóng đèn đường) cùng với các loại đèn khác nhau. Điều này giúp quản lý tình trạng và cải thiện hiệu suất của thiết bị chiếu sáng trên đường phố.</p>
                </ol>
                <h4>Đăng Nhập</h4>
                <p>Để truy cập và sử dụng các chức năng của trang web, người dùng cần đăng nhập bằng tài khoản và mật khẩu của họ. Quá trình đăng nhập đảm bảo tính bảo mật của dữ liệu và thông tin quản lý.</p>
              </TextStyle>
              <LinkStyles> </LinkStyles>
              {/* phần Hướng dẫn sử dụng */}
              <TextStyle>
                <h3>Hướng dẫn sử dụng</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </TextStyle>
              <LinkStyles>
                <p>
                  <a href="#">Tải tài liệu hướng dẫn sử dụng.</a>
                </p>
              </LinkStyles>
            </Col>
          </Row>
        </Container>
      </BodyStyles>
      <FooterStyle>
        <p>
          Bản quyền © 2023 thuộc về Trường Đại Học Kiến Trúc Thành phố Hồ Chí
          Minh
        </p>
      </FooterStyle>
    </HomeStyles>
    
  );
};

export default Home;
