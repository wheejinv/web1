import React, {Fragment} from 'react';
import {Link, Outlet, Route, Routes, useParams} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
	{ id: 'q1', author: 'Max', text: 'Learning React is fun!' },
	{ id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

function QuoteDetail(props) {
	const params = useParams();

	const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

	if (!quote) {
		return <p>No quote found!</p>
	}

	return (
		<Fragment>
			<h1>QuoteDetail</h1>
			{/*{...quote} 는 id={quote.id} author={quote.author} text={quote.text} 와 같음. */}
			<HighlightedQuote {...quote}/>
			<Routes>
				<Route path={`/`} element={(
					<div className="centered">
						<Link className="btn--flat" to={'comments'}>Load Comments</Link>
					</div>
				)}>

				</Route>
			</Routes>

			<Outlet />
		</Fragment>
	);
}

export default QuoteDetail;
