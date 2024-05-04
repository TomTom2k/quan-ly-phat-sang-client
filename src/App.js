import { useContext } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Routes,
    Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import route from './configs/route';
import UpdateDataNew from './pages/UpdateDataNew';
import { AuthToken } from './authToken';
import DashBoard from './pages/DashBoard';
import DataVisualization from './pages/DataVisualization';
import UpdateDataConsume from "./pages/UpdateDataNew/UpdateDataConsume";
import UpdateDataDevice from "./pages/UpdateDataNew/UpdateDataDevice";

const PrivateRoute = ({ children, requiredRole }) => {
    const { role } = useContext(AuthToken);
    if (
        (requiredRole === undefined && role !== null) ||
        requiredRole === role
    ) {
        return children;
    } else {
        return <Navigate to={route.login} />;
    }
};
const router = createBrowserRouter([
	{
		path: route.home,
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: route.login,
		element: (
				<Login />
		),
	},
	// {
	// 	path: route.update,
	// 	element: (
	// 		<Layout>
	// 			<PrivateRoute requiredRole={false}>
	// 				<UpdateDataNew />
	// 			</PrivateRoute>
	// 		</Layout>
	// 	),
	// },
	{
		path: route.updateConsume,
		element: (
			<Layout>
				<PrivateRoute requiredRole={false}>
					<UpdateDataConsume/>
				</PrivateRoute>
			</Layout>
		),
	},
	{
		path: route.updateDevice,
		element: (
			<Layout>
				<PrivateRoute requiredRole={false}>
					<UpdateDataDevice/>
				</PrivateRoute>
			</Layout>
		),
	},
	{
		path: route.chart,
		element: (
			<Layout>
				<PrivateRoute requiredRole={undefined}>
					<DashBoard />
				</PrivateRoute>
			</Layout>
		),
	},
	{
		path: route.visual,
		element: (
			<Layout>
				<PrivateRoute requiredRole={undefined}>
					<DataVisualization />
				</PrivateRoute>
			</Layout>
		),
	},

]);
function App() {
    return (
        <>
            <RouterProvider router={router}>
                <Routes />
            </RouterProvider>
        </>
    );
}

export default App;
