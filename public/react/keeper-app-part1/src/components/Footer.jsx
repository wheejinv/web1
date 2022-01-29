import React from 'react';

export default function () {
	let d = new Date();

	return (
		<footer>
			<p>copyright {d.getFullYear()}</p>
		</footer>
	);
}
