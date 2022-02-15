import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useEffect, useState} from "react";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
	let { isLoading, error, sendRequest } = useHttp();
	const [mealsList, setMealsList] = useState('');

	useEffect(async () => {
		console.log('useEffect');

		const parse = fetchData => {
			for (const key in fetchData) {
				let meals = fetchData[key];

				setMealsList(meals.map((meal) => (
					<MealItem
						key={meal.id}
						id={meal.id}
						name={meal.name}
						description={meal.description}
						price={meal.price}
					/>
				)));
			}
		}

		await sendRequest(parse, {url: 'https://whee-hello-firebase-default-rtdb.firebaseio.com/order.json'});

	}, []);


  return (
    <section className={classes.meals}>
      <Card>
				{isLoading && <p>loading...</p>}
				{error && <p>{error}</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
