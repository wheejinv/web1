import React from 'react';
import QuoteForm from "../components/quotes/QuoteForm";
import {useNavigate} from "react-router-dom";

function NewQuote(props) {
	const navigate = useNavigate();

	const addQuoteHandler = quoteData => {
		console.log(quoteData);

		navigate('/quotes', {replace: true});
	}

	return (
		<QuoteForm onAddQuote={addQuoteHandler}/>
	);
}

export default NewQuote;
