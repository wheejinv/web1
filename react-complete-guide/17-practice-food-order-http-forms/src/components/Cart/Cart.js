import {useContext, useState} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
	const { isLoading, error, sendRequest } = useHttp();
  const cartCtx = useContext(CartContext);
	const [isCheckout, setIsCheckout] = useState(false);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

	const submitOrderHandler = (userData) => {
		sendRequest( data => {
			console.log(data);
		}, {
			url: 'https://whee-hello-firebase-default-rtdb.firebaseio.com/orders.json',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				user: userData,
				orderedItems: cartCtx.items,
			},
		})
	}

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
			{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      <div className={classes.actions}>
				{!isCheckout && <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>}
        {!isCheckout && hasItems && <button className={classes.button} onClick={() => {
					setIsCheckout(true);
				}}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
