import mock from "../model/mockProduct.js";

const WebPage = async () => {
	// const response = await fetch('https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products');
	// const arrProduct = await response.json();

	const arrProduct = mock;

	console.log(arrProduct);

	let result = `<div class="ProductListPage">
    <h1>상품목록</h1>
    <ul>`;
	for (let index = 0; index < arrProduct.length; index++) {
		const product = arrProduct[index];
		const {id, name, imageUrl, price} = product;

		result += `<li class="Product">
        <a href="/web/products/${id}">
        <img src="${imageUrl}">
        </a>
        <div class="Product__info">
          <div>${name}</div>
          <div>${price.toLocaleString()}원~</div>
        </div>
      </li>`
	}
	result += `</ul></div>`

	return result;
}

export default WebPage;
