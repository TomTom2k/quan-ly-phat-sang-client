import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

const userApi = {
	getDiaPhuong: () => {
		const url = '/diaphuong';
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		return axiosClient.get(url, config);
	},
	getKhuVuc: (userId) => {
		const url = '/khuvuc';
		const token = Cookies.get('authToken');

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: userId ? { user_id: userId } : undefined,
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
