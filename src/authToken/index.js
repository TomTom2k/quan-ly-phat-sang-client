import React, { createContext } from 'react';

export let AuthToken = createContext();

const AuthProvider = ({ children }) => {
	const login = (data) => {
		console.log(data);
	};
	let authData = {
		user: null,
		login,
	};
	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvider;
