import classes from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/authSlice";

const Header = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const loginHandler = e => {
		dispatch(authActions.login());
	}

	const logoutHandler = e => {
		dispatch(authActions.logout());
	}

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
				{isAuthenticated && <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>}
				{!isAuthenticated && <button onClick={loginHandler}>Login</button>}
      </nav>
    </header>
  );
};

export default Header;
