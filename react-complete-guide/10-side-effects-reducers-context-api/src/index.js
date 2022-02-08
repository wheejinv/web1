import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {AuthContextProvider} from "./stroe/auth-context";

ReactDOM.render((
	// AuthContextProvider 가 context 를 사용하고 있는 앱단으로 가면 오류 생김.
	// 처음 context 값이 AuthContext effect 보다 빨리 실행됨.
	<AuthContextProvider>
		<App/>
	</AuthContextProvider>
), document.getElementById('root'));
