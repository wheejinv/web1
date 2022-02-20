import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect} from "react";
import Notification from "./components/UI/Notification";
import {sendCartData} from "./store/cart-slice";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const uiState = useSelector(state => state.ui)
	const cart = useSelector(state => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		dispatch(sendCartData(cart))

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
