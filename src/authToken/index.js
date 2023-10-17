import React, { createContext } from 'react';

export let AuthToken = createContext();

const AuthProvider = ({ children }) => {
	let authData = {
		user: null,
	};
	return <AuthToken.Provider value={authData}>{children}</AuthToken.Provider>;
};

export default AuthProvider;
