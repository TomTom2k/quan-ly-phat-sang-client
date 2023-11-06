import React from "react";
import styled from "styled-components";

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

const Banner = ({ image, title }) => {
    return (
        <BannerImgCD>
            <img src={image} alt=""></img>
            <p>{title}</p>
        </BannerImgCD>
    );
};

export default Banner;
