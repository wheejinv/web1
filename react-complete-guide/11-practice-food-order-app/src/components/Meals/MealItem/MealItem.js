import React, {useContext} from 'react';
import styles from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

function MealItem(props) {
	let {id, name, description, price} = props;

	price = `$${price.toFixed(2)}`;

	const cartCtx = useContext(CartContext);

	const addToCartHandler = amount => {
		cartCtx.addItem({
			id,
			name,
			amount,
			price: props.price
		})
	}

	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={props.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
}

export default MealItem;
