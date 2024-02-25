import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const visualApi = {
	uploadFile: (file, year) => {
		const url = '/du-doan-upload';
		const formData = new FormData();
		formData.append('file', file);
		formData.append('year', year);
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};
		return axiosClient.post(url, formData, config);
	},
};

export default visualApi;
