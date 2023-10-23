import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import route from './configs/route';
import InvoiceDashboard from './pages/InvoiceDashboard';
import DeviceDashboard from './pages/DeviceDashboard';
import ConsumeDashboard from './pages/ConsumeDashboard';
import UpdateData from './pages/UpdateData';

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
				<UpdateData />
			</Layout>
		),
	},
	{
		path: route.invoice,
		element: (
			<Layout>
				<InvoiceDashboard />
			</Layout>
		),
	},
	{
		path: route.device,
		element: (
			<Layout>
				<DeviceDashboard />
			</Layout>
		),
	},
	{
		path: route.consume,
		element: (
			<Layout>
				<ConsumeDashboard />
			</Layout>
		),
	},
]);
function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
