import {Fragment} from 'react';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
	return quotes.sort((quoteA, quoteB) => {
		if (ascending) {
			return quoteA.id > quoteB.id ? 1 : -1;
		} else {
			return quoteA.id < quoteB.id ? 1 : -1;
		}
	});
};

const QuoteList = (props) => {
	const navigate = useNavigate();
	// const location = useLocation();

	const [searchParams, setSearchParams] = useSearchParams();

	const isSortingAscending = searchParams.get('sort') === 'asc';

	const changeSortingHandler = () => {
		// navigate('/quotes?sort=asc');
		// https://stackoverflow.com/questions/70561612/how-to-pass-and-use-query-parameters-through-react-router

		navigate({
			pathname: '/quotes',
			search: `?${createSearchParams({
				sort: isSortingAscending ? 'desc' : 'asc',
			})}`,
		}, {
			replace: true,
		});
	}

  return (
    <Fragment>
			<div className={classes.sorting}>
				<button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
			</div>
      <ul className={classes.list}>
				{sortQuotes(props.quotes, isSortingAscending)
					.map((quote) => (
						<QuoteItem
							key={quote.id}
							id={quote.id}
							author={quote.author}
							text={quote.text}
						/>
					))}
			</ul>
    </Fragment>
  );
};

export default QuoteList;
