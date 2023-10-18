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
    color: white;
    align-items: center;
    font-size: 2rem;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 500;
    line-height: 2.5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 11rem;
  }
`;
const BodyStyles = styled.div`
  width: 100%;
  height: 1000px;
`;
const TextStyle = styled.div`
  h3 {
    margin: 0;
    width: 30%;
    padding: 2rem 0;
    color: rgb(197, 47, 51, 1);
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.56;
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
                <h3>Tổng quan website</h3>
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
