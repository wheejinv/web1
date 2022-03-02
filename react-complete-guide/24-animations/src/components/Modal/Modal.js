import React, {Fragment} from "react";

import "./Modal.css";
import {Transition} from "react-transition-group";

const modal = props => {
	const animationTiming = {
		enter: 400,
		exit: 1000,
	};

	return (
		<Fragment>
			<Transition
				in={props.show}
				timeout={animationTiming}
				mountOnEnter
				unmountOnExit
			>
				{state => {
					const cssClasses = [
						"Modal",
						state === 'entering'
							? "ModalOpen"
							: state === 'exiting' ? "ModalClosed" : null
					];

					return (
						<div className={cssClasses.join(' ')}>
							<h1>A Modal</h1>
							<button className="Button" onClick={props.closed}>
								Dismiss
							</button>
						</div>
					);
				}}
			</Transition>
		</Fragment>
	);
};

export default modal;
