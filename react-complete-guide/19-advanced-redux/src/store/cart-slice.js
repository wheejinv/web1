import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const initialCartState = {
	items: [],
	totalQuantity: 0,
	changed: false,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.totalQuantity = action.payload.totalQuantity;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find(item => item.id === newItem.id);
			state.totalQuantity++;
			state.changed = true;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find(item => item.id === id);
			state.totalQuantity--;
			state.changed = true;
			// 강사는 removeItemFromCart 함수가 실행되었다는 것은
			// existingItem 은 무조건 존재하는 상황이라고 생각하고 구현한듯
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.totalPrice -= existingItem.price;
				existingItem.quantity--;
			}
		},
	}
});

export const cartActions = cartSlice.actions;
export default cartSlice;
