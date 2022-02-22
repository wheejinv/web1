import React, {Fragment} from 'react';
import {Link, Outlet, useParams} from "react-router-dom";

function QuoteDetail(props) {
	const params = useParams();

	return (
		<Fragment>
			<h1>QuoteDetail</h1>
			<p>{params.quoteId}</p>

			<Link to={'comments'}>gogo</Link>

			<Outlet />
		</Fragment>
	);
}

export default QuoteDetail;
