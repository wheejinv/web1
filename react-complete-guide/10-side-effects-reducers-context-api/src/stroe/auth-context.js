import React, {useEffect, useState} from 'react'

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {}, // ide 의 자동 완성 기능을 위해 추가
	onLogIn: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				onLogout: logoutHandler,
				onLogIn: loginHandler,
			}}
		>{props.children}</AuthContext.Provider>
	)
}

export default AuthContext;
