import ModelSelect from '../../model/selected.js'
import {product1, product2, product3} from "../../model/mockProductDetail.js";

let modelSelect = new ModelSelect();

const productDetail = async (productId) => {
	// const response = await fetch(`https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products/${productId}`);
	// const json = await response.json();

	let json;
	switch (productId) {
		case '1':
			json = product1;
			break;
		case '2':
			json = product2;
			break;
		case '3':
			json = product3;
			break;
		default:
			json = product1;
			break;
	}

	const {id, name, price, imageUrl, productOptions} = json;

	const renderOptionList = () => {
		let result = '';
		for (let index = 0; index < productOptions.length; index++) {
			const productOption = productOptions[index];
			let isZeroStock = false;

			const {id, name: optionName, price, stock, created_at, updated_at} = productOption;
			let priceDescription = '';
			if (price === 0) {
				priceDescription = '';
			} else if (price > 0) {
				priceDescription = `$${price.toLocaleString()}원`
			}

			if (stock === 0) {
				isZeroStock = true;
				priceDescription = '';
			}

			result += `<<option${isZeroStock ? ' disabled' : ''}>${isZeroStock ? '(품절) ' : ''}${name} ${optionName} ${priceDescription}</option>`;
		}

		return result;
	}

	window.handleSelected = () => {
		var optionSelect = document.getElementById("optionSelector");

		var selectValue = optionSelect.options[optionSelect.selectedIndex].value;

		modelSelect.pushSelected(selectValue);

		rerender_spa();
	}

	const renderSelected = () => {
		let result = '<li>';

		//   `
		//   커피잔 100개 번들 10,000원 <div><input type="number" value="10">개</div>
		// `
		for (let index = 0; index < modelSelect.selectedIdList.length; index++) {
			const selectTitle = modelSelect.selectedIdList[index];



			result += `<<option>${name}</option>`;
		}

		result += '</li>';

		return result;
	}



	let result = `
    <div class="ProductDetailPage">
        <h1>${name} 상품 정보</h1>
        <div class="ProductDetail">
          <img src="${imageUrl}">
          <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price">${price.toLocaleString()}원~</div>
            <select id='optionSelector' onchange='handleSelected()'}>
              <option>선택하세요.</option>
              ${renderOptionList()}
            </select>
            <div class="ProductDetail__selectedOptions">
              <h3>선택된 상품</h3>
              <ul>
                <li>
                  커피잔 100개 번들 10,000원 <div><input type="number" value="10">개</div>
                </li>
                <li>
                  커피잔 1000개 번들 15,000원 <div><input type="number" value="5">개</div>
                </li>
              </ul>
              <div class="ProductDetail__totalPrice">175,000원</div>
              <button class="OrderButton">주문하기</button>
            </div>
          </div>
        </div>
      </div>`;

	return result;
}

export default productDetail
