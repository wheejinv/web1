import React from 'react';
import styles from './MealItem.module.css';
import MealItemForm from "./MealItemForm";

function MealItem(props) {
	let {id, name, description, price} = props;

	price = `$${price.toFixed(2)}`;

	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<div className={styles.description}>{description}</div>
				<div className={styles.price}>{price}</div>
			</div>
			<div>
				<MealItemForm id={props.id}/>
			</div>
		</li>
	);
}

export default MealItem;
