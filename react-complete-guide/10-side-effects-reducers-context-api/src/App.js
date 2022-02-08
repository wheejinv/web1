import React, {useEffect, useState} from 'react';
import AuthContext from "./stroe/auth-context";

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

	// 두번째 인자인 deps 가 바뀌면 실행됨.
	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
		// provider 가 있어야 context 의 값을 변경할 수 있음.
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
			}}
		>
			{/*
			상태값 들이나 핸들러들이 다수의 컴포넌트를 통과하는 건 흔하지만, 앱이 복잡해 질수록 문제가 될 수 있다.
			이런 경우 React Context 라는 개념을 사용해서 (긴 props chain을 만들지 않아도) 컴포넌트로 직접 보낼 수 있게 됨.
			*/}
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
		</AuthContext.Provider>
  );
}

export default App;
