import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// 컴포넌트가 리렌더링될때마다 함수를 가리키는 포인터가 바뀌기 때문에 상수로 만들어준다.
	const fetchMovieHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('https://whee-hello-firebase-default-rtdb.firebaseio.com/movies.json');

			// 잘못된 url 요청이라면 이 부분에서 에러가 발생. Unexpected token < in JSON at position 1
			const json = await response.json();

			// 요청까지 잘 보냈는데 에러 응답 코드를 받게 되는 경우, 404, 500, 401
			// response.status
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			let fetchedMovieData = [];
			for (const key in json) {
				let {title, openingText, releaseDate} = json[key];

				fetchedMovieData.push({
					id: key,
					title,
					openingText,
					releaseDate
				})
			}

			setMovies(fetchedMovieData);
		} catch(e) {
			setError(e.message);
		}

		setIsLoading(false);
	}, []) // 상태 업데이트 함수는 디펜던시로 추가할 필요가 없고, fetch 함수는 글로벌 브라우저 API 라서 디펜던시가 아님.

	useEffect(async () => {
		await fetchMovieHandler();
	}, [fetchMovieHandler]); // effect 함수 내에 쓰이는 모든 디펜던시를 디펜던시 배열 내에 나열하는 것이 좋다.

	let content = <p>Found no movies.</p>

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />
	}

	if (error) {
		content = <p>{error}</p>
	}

	if (isLoading) {
		content = <p>데이터 가져오는 중...</p>
	}

	async function addMovieHandler(movie) {
		const response = await fetch('https://whee-hello-firebase-default-rtdb.firebaseio.com/movies.json', {
			method: 'POST',
			body: JSON.stringify(movie),
			headers: {
				'Content-type': 'application/json'
			}
		});
		const data = await response.json();

		console.log(data);
	}

  return (
    <React.Fragment>
			<section>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
				{content}
      </section>
    </React.Fragment>
  );
}

export default App;
