import React from 'react';
import styles from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

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
			<MealItem
				// jsx babel compiler 검색해서 react 코드로 변환된 결과를 보면 이런 값들이 어떻게 변환되서 들어가는지 유추 가능함.
				// https://stackoverflow.com/questions/42620847/is-there-a-react-shorthand-for-passing-props
				{
					...meal
				}
				key={meal.id}
			/>
		)
	});

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
}

export default AvailableMeals;

