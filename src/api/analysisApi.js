import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const analysisApi = {
	ChartKetHop: (reqData, calculationType) => {
		const url = `/chart/tieu-thu`;
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				calculation_type: calculationType,
			},
		};

		return axiosClient.post(url, reqData, config);
	},
};

export default analysisApi;
