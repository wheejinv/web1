import React, {useEffect} from 'react';
import QuoteForm from "../components/quotes/QuoteForm";
import {useNavigate} from "react-router-dom";
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api";

function NewQuote(props) {
	const navigate = useNavigate();
	const {sendRequest, status, data, error} = useHttp(addQuote);

	useEffect(() => {
		if (status === 'completed') {
			navigate('/quotes');
		}
	}, [status, navigate]);

	const addQuoteHandler = async quoteData => {
		await sendRequest(quoteData);
	}

	return (
		<QuoteForm isLoading={status !== null && status !== 'completed'} onAddQuote={addQuoteHandler}/>
	);
}

export default NewQuote;
