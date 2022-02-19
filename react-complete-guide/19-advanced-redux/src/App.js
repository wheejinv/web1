import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import {uiActions} from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const uiState = useSelector(state => state.ui)
	const cart = useSelector(state => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(uiActions.showNotification({
				status: 'pending',
				title: 'Sending..',
				message: 'Sending cart data!',
			}));
			const response = await fetch('https://whee-hello-firebase-default-rtdb.firebaseio.com/cart.json',{
				method: 'PUT',
				body: JSON.stringify(cart),
			})

			if (!response.ok) {
				throw new Error('Sending cart data failed.');
			}

			dispatch(uiActions.showNotification({
				status: 'success',
				title: 'Success!',
				message: 'Sent cart data successfully!',
			}));
		}

		if (isInitial) {
			isInitial = false;
			return;
		}

		sendCartData().catch(e => {
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'Error!',
				message: 'Sending cart data failed!\n' + e.message,
			}));
		})

	// useDispatch에 의해 생성된 dispatch 의존성 추가 - react-redux가 이 함수는 절대 변하지 않을것이라고 보증함.
	}, [cart, dispatch]);


  return (
		<Fragment>
			{notification && <Notification
				status={notification.status}
				title={notification.title}
				message={notification.message}
			/>}
			<Layout>
				{uiState.cartIsVisible && <Cart/>}
				<Products/>
			</Layout>
		</Fragment>
  );
}

export default App;
