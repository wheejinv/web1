import React, {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const getTotalAmount = items => {
	let totalAmountNum = items.reduce((acc, curr) => acc + curr.amount * parseFloat(curr.price), 0)

	return totalAmountNum.toFixed(2);
}

const cartReducer = (cartState, action) => {
	let items = cartState.items;

	if (action.type === 'ADD_ITEM') {
		const item = action.item;
		let index = cartState.items.findIndex(item => item.id === action.item.id);

		if (index > -1) {
			// 아이템이 있는 경우
			items[index].amount += 1;

			return {
				items,
				totalAmount: getTotalAmount(items)
			}
		} else {
			items.push(action.item);
			return {
				items,
				totalAmount: getTotalAmount(items)
			}
		}
	} else if (action.type === 'REMOVE_ITEM') {
		let id = action.id;
		let index = items.findIndex(item => item.id === id);

		// index === -1 인 경우 예외처리가 물론 .. 필요하겠지만 패스
		let itemAmount = items[index].amount;

		if (itemAmount > 1) {
			items[index].amount -= 1;
		} else {
			items = items.filter( item => item.id !== id);
		}

		return {
			items,
			totalAmount: getTotalAmount(items)
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
