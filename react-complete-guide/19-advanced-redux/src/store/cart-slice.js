import {createSlice} from "@reduxjs/toolkit";
import {uiActions} from "./ui-slice";

const initialCartState = {
	items: [],
	totalQuantity: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find(item => item.id === newItem.id);
			state.totalQuantity++;
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

// 사실상 함수인 액션을 disaptch 하고 있음. 액션 객체 대신.
// 사이드 이펙트를 실행할 수 있는 액션 생성함수를 가지려 할 때 사용함.
// 이는 Redux toolkit 을 사용할 때 Redux 안에 생겨날 것이다.
// 컴포넌트를 lean 하게 유지하고 너무 많은 로직을 갖고 있지 않는 것도 그리 나쁜 생각이 아니다.
export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(uiActions.showNotification({
			status: 'pending',
			title: 'Sending..',
			message: 'Sending cart data!',
		}));

		const sendRequest = async () => {
			const response = await fetch('https://whee-hello-firebase-default-rtdb.firebaseio.com/cart.json',{
				method: 'PUT',
				body: JSON.stringify(cart),
			})

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}
		}

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent cart data successfully!',
				})
			);

		} catch (e) {
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'Error!',
				message: 'Sending cart data failed!\n' + e.message,
			}));
		}
	}
}

export const cartActions = cartSlice.actions;
export default cartSlice;
