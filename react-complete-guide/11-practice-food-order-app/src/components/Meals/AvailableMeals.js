import React from 'react';
import styles from './AvailableMeals.module.css'

// 추후 데이터 베이스에서 데이터 가져올 예정.
const DUMMY_MEALS = [
	{
		id: 'm1',
		name: 'Sushi',
		description: 'Finest fish and veggies',
		price: 22.99,
	},
	{
		id: 'm2',
		name: 'Schnitzel',
		description: 'A german specialty!',
		price: 16.5,
	},
	{
		id: 'm3',
		name: 'Barbecue Burger',
		description: 'American, raw, meaty',
		price: 12.99,
	},
	{
		id: 'm4',
		name: 'Green Bowl',
		description: 'Healthy...and green...',
		price: 18.99,
	},
]

function AvailableMeals(props) {
	const mealsList = DUMMY_MEALS.map( meal => {
		return (
			<li>{meal.name}</li>
		)
	});

	return (
		<section className={styles.meals}>
			<ul>{mealsList}</ul>
		</section>
	);
}

export default AvailableMeals;

