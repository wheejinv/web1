import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

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
				//changed 라는 프로퍼티는 서버에서 관리할 필요가 없으므로
				body: JSON.stringify({
					items: cart.items,
					totalQuantity: cart.totalQuantity,
				}),
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

export const fetchCartData = () => {
	return async (dispatch) => {

		const fetchData = async () => {
			const response = await fetch('https://whee-hello-firebase-default-rtdb.firebaseio.com/cart.json');

			if (!response.ok) {
				throw new Error('Could not fetch cart data!');
			}

			return await response.json();
		}

		try {
			const cartData = await fetchData();

			if (cartData) {
				dispatch(cartActions.replaceCart({
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity || 0,
				}));
			}
		} catch (e) {
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'Error!',
				message: 'Fetching cart data failed!\n' + e.message,
			}));
		}
	}
}
