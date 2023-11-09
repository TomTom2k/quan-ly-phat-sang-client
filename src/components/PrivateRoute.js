import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthToken } from "../authToken";
import route from "../configs/route";

const PrivateRoute = ({ path, element, requiredRole }) => {
    const { role } = useContext(AuthToken);

    if (requiredRole === null && role !== null) {
        return <Route path={path} element={element} />;
    } else if (requiredRole === true && role === true) {
        return <Route path={path} element={element} />;
    } else if (requiredRole === false && role === false) {
        return <Route path={path} element={element} />;
    } else {
        return <Navigate to={route.login} />;
    }
};

export default PrivateRoute;
