import React from 'react';
import styles from './MainHeader.module.css'
import {Link} from "react-router-dom";

function MainHeader(props) {
	return (
		<header className={styles.header}>
			<nav>
				<ul>
					<li>
						{/*Link는 클릭을 listen 해서 브라우저 기본값을 막는다.*/}
						{/*대신 수동으로 URL을 업데이트해서 페이지가 전환된 것처럼 보이도록 함.*/}
						<Link to="/welcome">Welcome</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
