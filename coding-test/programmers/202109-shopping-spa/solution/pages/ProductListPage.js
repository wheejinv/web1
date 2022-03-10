import {mockRequest} from '../api.js'
import ProductList from "../components/ProductList.js";

function ProductListPage({$target}) {
	const $page = document.createElement('div')
	$page.className = 'ProductListPage'

	$page.innerHTML = '<h1>상품 목록</h1>'

	this.render = () => {
		if (!this.state) {
			return
		}

		$target.appendChild($page);
	}

	this.setState = (nextState) => {
		this.state = nextState;

		this.render();
	}

	const fetchProducts = async () => {
		const products = await mockRequest('/products')
		this.setState(products)
	}

	// 페이지 생성 시 API 요청해오도록 하는 처리
	// await keyword 를 붙이면 new 생성 시 에러남.
	fetchProducts().then( () => {
		let productList = new ProductList({
			$target: $page,
			initialState: this.state
		});
	})
}

export default ProductListPage;
