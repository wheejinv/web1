import React from 'react';

export default function Avatar(props) {
	return <img className="circle-img"
							src={props.info.imgURL}
							alt="avatar_img"
	/>
}
