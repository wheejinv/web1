import React, {useState} from 'react'

const AuthContext = React.createContext({
	token: null,
	onLogin: idToken => {},
	onLogout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);

	const loginHandler = token => {
		setToken(token);
	}

	const logoutHandler = () => {
		setToken(null);
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
