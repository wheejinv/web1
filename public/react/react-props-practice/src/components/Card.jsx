import React from 'react';
import Avatar from "./Avatar";
import Detail from "./Detail";

export default function Card(props) {
	const {name, imgURL, phone, email} = props.info;

	return (
		<div className="card">
			<div className="top">
				<h2 className="name">{name}</h2>
				<Avatar info={props.info}/>
			</div>
			<div className="bottom">
				<Detail info={props.info}/>
			</div>
		</div>
	)
}
