import React from 'react';

import styles from './MainNavigation.module.css';
import {NavLink} from "react-router-dom";

function MainNavigation(props) {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>Great Quotes</div>
			<nav className={styles.nav}>
				<ul>
					<li>
						<NavLink
							to='/quotes'
							className={({ isActive }) => (isActive ? styles.active : "")}
						>
							All Quotes
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/new-quote'
							className={({ isActive }) => (isActive ? styles.active : "")}
						>
							Add a Quote
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
