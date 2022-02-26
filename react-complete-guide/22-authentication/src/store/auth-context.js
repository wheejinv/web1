import React, {useEffect, useState} from 'react'

const AuthContext = React.createContext({
	token: null,
	onLogin: idToken => {},
	onLogout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
	const initialToken = localStorage.getItem('token');
	const [token, setToken] = useState(initialToken);

	const loginHandler = token => {
		setToken(token);
		localStorage.setItem('token', token);
	}

	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
	}

	const contextValue = {
		token,
		isLoggedIn: !!token,
		onLogin: loginHandler,
		onLogout: logoutHandler,
	}

	return (
		<AuthContext.Provider
			value={contextValue}
		>{props.children}</AuthContext.Provider>
	)
}
