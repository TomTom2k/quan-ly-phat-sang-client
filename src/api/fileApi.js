import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const fileApi = {
	uploadExcel: (file) => {
		const url = '/upload';
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
};

export default fileApi;
