import React, {useCallback, useEffect, useState} from 'react'

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

let logoutTimer;

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');

	const remainingTime = getRemainingTime(+storedExpirationDate);

	if (remainingTime < 0) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return {
		token: storedToken,
		remainingTime,
	}
}

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();

	let initialToken;

	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [token, setToken] = useState(initialToken);

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem('token', token);
		localStorage.setItem('expirationTime', expirationTime);

		const remainingTime = getRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	}

	// 디펜던시 관점에서의 주석
	const logoutHandler = useCallback(() => {
		setToken(null); // 리액트가 이 함수를 절대 바꾸지 않음.
		localStorage.removeItem('token'); // 브라우저 빌드인 함수
		localStorage.removeItem('expirationTime');

		if (logoutTimer) {
			// clearTimeout: 브라우저 빌트인 함수
			// logoutTimer: 글로벌 변수, 리액트 렌더링 흐름 바깥에 있으므로 추가할 필요 없음.
			clearTimeout(logoutTimer);
			logoutTimer = null;
		}
	}, []);

	let isLoggedIn = !!token;

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
		}
	}, [tokenData, logoutHandler]);


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
