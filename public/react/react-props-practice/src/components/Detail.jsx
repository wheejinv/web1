import React from 'react';

function Detail(props) {

	const {name, imgURL, phone, email} = props.info;

	return (
		<div>
			<p className="info">{phone}</p>
			<p className="info">{email}</p>
		</div>
	);
}

export default Detail;
