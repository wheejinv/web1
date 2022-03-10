import {routeChange} from "../router.js"

function ProductList({ $target, initialState }) {
	const $productList = document.createElement('ul')
	$target.appendChild($productList)

	this.state = initialState;

	this.setState = nextState => {
		this.state = nextState
		this.render()
	}

	this.render = () => {
		if (!this.state) {
			return
		}
		$productList.innerHTML = `
      ${this.state.map(product =>
			// 데이터 속성 사용하기 참고
			// https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/Use_data_attributes
			`
          <li class="Product" data-product-id="${product.id}">
          <a href="/products/${product.id}">
            <img src="${product.imageUrl}">
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price.toLocaleString()}원~</div>
            </div>
            </a>
          </li>
        `
		).join('')}`
	}

	this.render();

	$productList.addEventListener('click', (e) => {
		const $li = e.target.closest('li')
		const { productId } = $li.dataset

		if (productId) {
			routeChange(`/products/${productId}`)
		}
	})
}

export default ProductList;
