import React from 'react';

export default function(props) {
	const {name, imgURL, phone, email} = props.info;

	return (
		<div className="card">
			<div className="top">
				<h2 className="name">{name}</h2>
				<img className="circle-img"
						 src={imgURL}
						 alt="avatar_img"
				/>
			</div>
			<div className="bottom">
				<p className="info">{phone}</p>
				<p className="info">{email}</p>
			</div>
		</div>
	)
}
