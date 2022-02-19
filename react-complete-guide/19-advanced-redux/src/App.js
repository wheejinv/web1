import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
	const uiState = useSelector(state => state.ui)
	const cart = useSelector(state => state.cart);

	useEffect(() => {
		console.log('run use effect')
		fetch('https://whee-hello-firebase-default-rtdb.firebaseio.com/cart.json',{
			method: 'PUT',
			body: JSON.stringify(cart),
		})
	}, [cart]);


  return (
    <Layout>
			{uiState.cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
