import React from 'react'

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {} // ide 의 자동 완성 기능을 위해 추가
});

export default AuthContext;
