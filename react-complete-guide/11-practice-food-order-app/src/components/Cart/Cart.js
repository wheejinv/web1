import React from 'react';
import styles from './Cart.module.css'
import Modal from "../UI/Modal";

function Cart(props) {
	const CartItems = (
		<ul className={styles['cart-items']}>
			{[{
				id: 'c1',
				name: 'Sushi',
				amount: 2,
				price: 12.99
			}].map(item => {
				return <li>{item.name}</li>
			})}
		</ul>
	);


	return (
		<Modal>
			{CartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>35.62</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']}>Close</button>
				<button className={styles.button}>Order</button>
			</div>
		</Modal>
	);
}

export default Cart;
