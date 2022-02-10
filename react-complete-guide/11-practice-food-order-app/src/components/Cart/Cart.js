import React, {useContext} from 'react';
import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
	const cartCtx = useContext(CartContext);

	const addItemHandler = item => {
		cartCtx.addItem(item);
	}

	const removeItemHandler = id => {
		cartCtx.removeItem(id);
	}

	const CartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map(item => {
				return (<CartItem
					{...item}
					key={item.id}
					onAdd={addItemHandler.bind(null, item)}
					onRemove={removeItemHandler.bind(null, item.id)}/>
				)
			})}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{CartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>${cartCtx.totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button onClick={props.onClose} className={styles['button--alt']}>Close</button>
				{cartCtx.items.length > 0 && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
}

export default Cart;
