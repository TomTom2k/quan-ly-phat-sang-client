import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const LoadingStyled = styled.div`
    width: 100%;
    height: 100%;
    backdrop-filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingCus = ({ children, ...props }) => {
    return (
        <LoadingStyled>
            <Spinner {...props}>{children}</Spinner>
        </LoadingStyled>
    );
};

export default LoadingCus;
