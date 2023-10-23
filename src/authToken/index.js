import React, { createContext } from 'react';

import authApi from '../api/authApi';

export let AuthToken = createContext();

const AuthProvider = ({ children }) => {
	const login = async (data) => {
		const res = await authApi.login(data);
	};
	let authData = {
		user: null,
		login,
	};
	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvider;
