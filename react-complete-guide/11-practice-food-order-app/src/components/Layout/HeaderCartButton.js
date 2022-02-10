import React, {useContext, useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
	const cartCtx = useContext(CartContext);
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const items = cartCtx.items;
	// 카트에 담겨있는 개수의 총합: 예) 스시 3개 담으면, 3이 표시되어야 함.
	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0)

	const btnClasses = `${styles.button}${btnIsHighlighted ? ' ' +styles.bump : ''}`;

	// 카트의 숫자가 변했을 때 애니메이션을 넣고 싶다.
	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}

		setBtnIsHighlighted(true);

		const timer = setTimeout( () => {
			setBtnIsHighlighted(false);
		}, 300)

		return () => {
			clearTimeout(timer);
		}

	}, [numberOfCartItems]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
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
