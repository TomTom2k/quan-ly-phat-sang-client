import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const userApi = {
	getKhuVuc: () => {
		const url = '/khuvuc';
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.get(url, config);
	},
	getTram: (khuVucId) => {
		const url = '/tram';
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: khuVucId ? { khu_vuc_id: khuVucId } : undefined,
		};

		return axiosClient.get(url, config);
	},
};

export default userApi;
