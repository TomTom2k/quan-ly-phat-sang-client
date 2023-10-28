import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import authApi from '../api/authApi';
import decodeJwtPayload from '../util/decodeJwt';

export let AuthToken = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(Cookies.get('authToken') || null);

	const login = async (data) => {
		const res = await authApi.login(data);

		if (res && res.data.tokens) {
			// Đặt token vào cookie với tên là 'authToken' và thời gian sống là 7 ngày
			Cookies.set('authToken', res.data.tokens.access, { expires: 7 });
			setUser(res.data.tokens.access);
			const decode = decodeJwtPayload(res.data.tokens.access);
			Cookies.set('role', decode?.is_manager);
		}
	};
	const logout = () => {
		setUser(null);
		Cookies.remove('role');
		Cookies.remove('authToken');
	};
	let authData = {
		user,
		login,
		logout,
	};
	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvider;
