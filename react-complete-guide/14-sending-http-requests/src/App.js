import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMovieHandler = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('https://swapi.dev/api/films/');

			// 잘못된 url 요청이라면 이 부분에서 에러가 발생. Unexpected token < in JSON at position 1
			const json = await response.json();

			// 요청까지 잘 보냈는데 에러 응답 코드를 받게 되는 경우, 404, 500, 401
			// response.status
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			let fetchedMovieData = json.results.map( (item, index) => {
				return {
					id: item.episode_id,
					title: item.title,
					openingText: item.opening_crawl,
					releaseDate: item.release_date,
				}
			});

			setMovies(fetchedMovieData);
		} catch(e) {
			setError(e.message);
		}

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
				{!isLoading && movies.length == 0 && !error && <p>Found No Movies.</p>}
				{isLoading && <p>데이터 가져오는 중...</p>}
				{!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
