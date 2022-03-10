import {mockRequest} from '../api.js'
import ProductDetail from "../components/ProductDetail.js";

function ProductDetailPage({ $target, productId }) {
	this.state = {
		productId,
		product: null
	}
	const $page = document.createElement('div')
	$page.className = 'ProductDetailPage'

	$page.innerHTML = '<h1>상품 정보</h1>'

	this.setState = nextState => {
		this.state = nextState;
		this.render();
	}

	this.render = () => {
		if (!this.state.product) {
			$target.innerHTML = 'Loading..'
		} else {
			$target.innerHTML = ''
			$target.appendChild($page)
			// ProductDetail 렌더링하기


		}
	}

	this.fetchProduct = async () => {
		const { productId } = this.state
		const product = await mockRequest(`/products/${productId}`)
		this.setState({
			...this.state,
			product
		})
	}

	this.fetchProduct().then( () => {
		let productDetail = new ProductDetail({
			$target,
			initialState: this.state,
		})
	});
}

export default ProductDetailPage;
