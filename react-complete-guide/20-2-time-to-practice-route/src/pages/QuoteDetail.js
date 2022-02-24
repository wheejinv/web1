import React, {Fragment, useEffect} from 'react';
import {Link, Outlet, Route, Routes, useParams} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

function QuoteDetail(props) {
	const params = useParams();
	const {sendRequest, status, error, data: loadedQuote} = useHttp(getSingleQuote, true);

	const {quoteId} = params;

	useEffect(async () => {
		await sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	if (status === 'pending') {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		)
	}

	if (error) {
		return <p className='centered focused'>{error}</p>
	}

	if (status === 'completed' && !loadedQuote.text) {
		return <NoQuotesFound />
	}

	return (
		<Fragment>
			<h1>QuoteDetail</h1>
			{/*{...quote} 는 id={quote.id} author={quote.author} text={quote.text} 와 같음. */}
			<HighlightedQuote {...loadedQuote}/>
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
