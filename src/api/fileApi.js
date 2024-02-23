import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const fileApi = {
	uploadThietBi: (file) => {
		const url = '/thiet-bi-upload';
		const formData = new FormData(); // Using FormData to handle files
		formData.append('file', file);
		const token = Cookies.get('authToken');

		// Update headers for multipart/form-data
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.post(url, formData, config);
	},
	confirmThietBi: (data) => {
		const url = '/thiet-bi-upload';
		const token = Cookies.get('authToken');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.put(url, data, config);
	},
	uploadTieuThu: (file) => {
		const url = '/dien-nang-upload';
		const formData = new FormData(); // Using FormData to handle files
		formData.append('file', file);
		const token = Cookies.get('authToken');

		// Update headers for multipart/form-data
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.post(url, formData, config);
	},
	confirmTieuThu: () => {
		const url = '/dien-nang-upload';
		const token = Cookies.get('authToken');
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.put(url, { confirm: true }, config);
	},
};

export default fileApi;
