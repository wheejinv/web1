import React, {useContext} from 'react';
import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
	const cartCtx = useContext(CartContext);

	// 카트에 담겨있는 개수의 총합: 예) 스시 3개 담으면, 3이 표시되어야 함.
	const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0)

	return (
		<button className={styles.button} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon/>
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>
				{numberOfCartItems}
			</span>
		</button>
	);
}

export default HeaderCartButton;
