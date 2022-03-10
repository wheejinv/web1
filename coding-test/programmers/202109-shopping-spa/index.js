import WebPage from './pages/index.js';
import ProductDetailPage from './pages/products/productDetail.js';
import CartPage from './pages/cart/index.js'

const routes = async (path) => {
	console.log(`routes: ${path}`);
	const pageDetailUrl = '/web/products/';

	if (path === '/web/') {
		console.log('WebPage intro');
		return await WebPage();
	} else if (path === '/web/cart') {
		return await CartPage();
	} else if (path.includes(pageDetailUrl)) {
		let id = path.substring(pageDetailUrl.length);
		var urlParams = new URLSearchParams(window.location.search);

		return await ProductDetailPage(id, urlParams);
	} else {
		return await WebPage();
	}
}

window.rerender_spa = async () => {
	const rootDiv = document.getElementById('root');
	rootDiv.innerHTML = await routes(window.location.pathname);
}

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = '';

window.onload = async () => {
	rootDiv.innerHTML = await routes(window.location.pathname);
}

// console.log(window.location.pathname);
