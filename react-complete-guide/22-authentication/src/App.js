import {Navigate, Routes, Route} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import {useContext} from "react";
import AuthContext from "./store/auth-context";

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage/>}/>
				{!authCtx.token && (<Route path='/auth' element={<AuthPage/>}/>)}
				{authCtx.token && (<Route path='/profile' element={<UserProfile/>}/>)}
				<Route path='*' element={<Navigate to="/"/>}/>
			</Routes>
		</Layout>
	);
}

export default App;
