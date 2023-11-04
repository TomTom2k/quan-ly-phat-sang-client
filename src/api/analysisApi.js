import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const analysisApi = {
	chartDienNangTieuThuThanhTien: (reqData) => {
		const url = '/chart/dien-nang-tieu-thu';
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.post(url, reqData, config);
	},
};

export default analysisApi;
