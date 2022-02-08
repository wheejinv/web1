import React, {Fragment, useContext} from 'react';
import AuthContext from "./stroe/auth-context";

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<Fragment>
      <MainHeader/>
      <main>
        {!authCtx.isLoggedIn && <Login/>}
        {authCtx.isLoggedIn && <Home/>}
      </main>
		</Fragment>
  );
}

export default App;
