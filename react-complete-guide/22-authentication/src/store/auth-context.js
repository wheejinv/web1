import React, {useEffect, useState} from 'react'

const AuthContext = React.createContext({
	token: null,
	onLogin: idToken => {},
	onLogout: () => {},
});

export default AuthContext;

const getRemainingTime = expirationTime => {
	const current = Date.now();

	return expirationTime - current;
}

export const AuthContextProvider = (props) => {
	const initialToken = localStorage.getItem('token');
	const [token, setToken] = useState(initialToken);

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expirationTime', '' + expirationTime);

		const remainingTime = getRemainingTime(expirationTime);

		setTimeout(logoutHandler, remainingTime);
	}

	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
	}

	let isLoggedIn = !!token;

	const contextValue = {
		token,
		isLoggedIn,
		onLogin: loginHandler,
		onLogout: logoutHandler,
	}

	return (
		<AuthContext.Provider
			value={contextValue}
		>{props.children}</AuthContext.Provider>
	)
}
