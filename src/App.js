import { useContext } from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Routes,
	Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import route from './configs/route';
import InvoiceDashboard from './pages/InvoiceDashboard';
import DeviceDashboard from './pages/DeviceDashboard';
import ConsumeDashboard from './pages/ConsumeDashboard';
import UpdateData from './pages/UpdateData';
import UpdateDataNew from './pages/UpdateDataNew';
import { AuthToken } from './authToken';

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
			<Layout>
				<Login />
			</Layout>
		),
	},
	{
		path: route.update,
		element: (
			<Layout>
				<PrivateRoute requiredRole={false}>
					<UpdateDataNew />
				</PrivateRoute>
			</Layout>
		),
	},
	{
		path: route.invoice,
		element: (
			<Layout>
				<PrivateRoute requiredRole={undefined}>
					<InvoiceDashboard />
				</PrivateRoute>
			</Layout>
		),
	},
	{
		path: route.device,
		element: (
			<Layout>
				<PrivateRoute requiredRole={undefined}>
					<DeviceDashboard />
				</PrivateRoute>
			</Layout>
		),
	},
	{
		path: route.consume,
		element: (
			<Layout>
				<PrivateRoute requiredRole={undefined}>
					<ConsumeDashboard />
				</PrivateRoute>
			</Layout>
		),
	},
	// {
	//     path: route.data,
	//     element: (
	//         <Layout>
	//             <PrivateRoute requiredRole={undefined}>
	//                 <UpdateDataNew />
	//             </PrivateRoute>
	//         </Layout>
	//     ),
	// },
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
