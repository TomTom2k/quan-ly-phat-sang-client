import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import authApi from '../api/authApi';
import decodeJwtPayload from '../util/decodeJwt';

export let AuthToken = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = async (data) => {
		const res = await authApi.login(data);

		if (res && res.data.tokens) {
			// Đặt token vào cookie với tên là 'authToken' và thời gian sống là 7 ngày
			Cookies.set('authToken', res.data.tokens, { expires: 7 });
			// console.log(res.tokens);
			setUser(res.data.tokens);
			const decode = decodeJwtPayload(res.data.tokens.access);
			Cookies.set('role', decode?.is_manager);
		}
	};
	let authData = {
		user,
		login,
	};
	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvider;
