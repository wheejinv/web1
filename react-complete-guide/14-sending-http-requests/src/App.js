import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const dummyMovies = [
		{
			id: 1,
			title: 'Some Dummy Movie',
			openingText: 'This is the opening text of the movie',
			releaseDate: '2021-05-18',
		},
		{
			id: 2,
			title: 'Some Dummy Movie 2',
			openingText: 'This is the second opening text of the movie',
			releaseDate: '2021-05-19',
		},
	];

	const [movieState, setMovieState] = useState(dummyMovies);

	const fetchMovieHandler = async () => {
		const response = await fetch('https://swapi.dev/api/films/');
		const json = await response.json();

		console.log(json)

		let fetchedMovieData = json.results.map( (item, index) => {
			return {
				id: item.episode_id,
				title: item.title,
				openingText: item.opening_crawl,
				releaseDate: item.release_date,
			}
		});

		setMovieState(fetchedMovieData);
	}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movieState} />
      </section>
    </React.Fragment>
  );
}

export default App;
