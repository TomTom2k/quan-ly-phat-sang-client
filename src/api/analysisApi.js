import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const analysisApi = {
	dienNangTieuThuThoiGian: (reqData) => {
		const url = '/chart/dien-nang-tieu-thu/thoi-gian';
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.post(url, reqData, config);
	},

	dienNangTieuThuViTri: (reqData) => {
		const url = '/chart/dien-nang-tieu-thu/vi-tri';
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
