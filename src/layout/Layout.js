import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
    return (
        <layoutStyled>
            <Header />
            {children}
            <Footer />
        </layoutStyled>
    );
};

export default Layout;
