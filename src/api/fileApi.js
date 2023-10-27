import axiosClient from './axiosClient';

const fileApi = {
	uploadExcel: (file) => {
		const url = '/upload';
		const formData = new FormData(); // Using FormData to handle files
		formData.append('file', file); // 'excel' is the field name, similar to <input name="excel" type="file" />

		// Update headers for multipart/form-data
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		return axiosClient.post(url, formData, config);
	},
};

export default fileApi;
