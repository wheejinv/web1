import React, {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (cartState, action) => {
	if (action.type === 'ADD_ITEM') {
		const item = action.item;
		let index = cartState.items.findIndex(item => item.id === action.item.id);

		if (index > -1) {
			// 아이템이 있는 경우
			let items = [...cartState.items];
			items[index].amount += item.amount;

			return {
				items,
				totalAmount: items.reduce((acc, curr) => acc + curr.amount * parseFloat(curr.price), 0)
			}
		} else {
			let items = [...cartState.items, action.item];
			return {
				items,
				totalAmount: items.reduce((acc, curr) => acc + curr.amount * parseFloat(curr.price), 0)
			}
		}
	} else if (action.type === 'REMOVE_ITEM') {
		let id = action.id;
		let items = [...cartState.items].filter( item => item.id !== id);
		return {
			items,
			totalAmount: items.reduce((acc, curr) => acc + curr.amount * parseFloat(curr.price), 0)
		}
	}
}

function CartProvider(props) {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = item => {
		dispatchCartAction({
			type: 'ADD_ITEM',
			item,
		})
	};

	const removeItemFromCartHandler = id => {
		dispatchCartAction({
			type: 'REMOVE_ITEM',
			id,
		})
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	}

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartProvider;
