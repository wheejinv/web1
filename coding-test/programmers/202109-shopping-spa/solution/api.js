import mockProduct from "../model/mockProduct.js";
import * as productDetail from "../model/mockProductDetail.js"

const API_END_POINT = 'https://sample';

export const request = async (url, options = {}) => {
	try {
		const fullUrl = `${API_END_POINT}${url}`
		const response = await fetch(fullUrl, options)

		if (response.ok) {
			const json = await response.json()
			return json;
		}
		throw new Error('API 통신 실패')
	} catch (e) {
		alert(e.message);
	}
}

export const mockRequest = async (url, options) => {
	if (url === '/products') {
		return mockProduct;
	} else if (url.indexOf('/products/') === 0) {
		let id = url.split('/')[2];
		return productDetail[`product${id}`];
	}
}
