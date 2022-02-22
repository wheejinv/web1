import {Route, Routes, Navigate} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
		<div>
			<MainHeader/>
			<main>
				<Routes>
					<Route path="/welcome/*" element={<Welcome/>}/> {/*<-- allow sub-route matches*/}
					<Route path="/products" element={<Products/>}/>
					{/*productId: 동적 경로 세그먼트 - 아무값이나 받을 수 있음.*/}
					<Route path="/products/:productId" element={<ProductDetail/>}/>
					<Route path="/*" element={<Navigate to="/"/>}/>
				</Routes>
			</main>
		</div>
  );
}

export default App;
