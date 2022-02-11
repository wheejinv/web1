import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMovieHandler = async () => {
		setIsLoading(true);

		const response = await fetch('https://swapi.dev/api/films/');
		const json = await response.json();

		let fetchedMovieData = json.results.map( (item, index) => {
			return {
				id: item.episode_id,
				title: item.title,
				openingText: item.opening_crawl,
				releaseDate: item.release_date,
			}
		});

		setMovies(fetchedMovieData);
		setIsLoading(false);
	}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}

				{/*폴백 예시*/}
				{!isLoading && movies.length == 0 && <p>Found No Movies.</p>}
				{isLoading && <p>데이터 가져오는 중...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
