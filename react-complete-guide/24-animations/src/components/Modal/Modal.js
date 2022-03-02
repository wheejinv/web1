import React, {Fragment} from "react";

import "./Modal.css";
import {CSSTransition} from "react-transition-group";

const modal = props => {
	const animationTiming = {
		enter: 400,
		exit: 1000,
	};

	return (
		<Fragment>
			<CSSTransition
				in={props.show}
				timeout={animationTiming}
				mountOnEnter
				unmountOnExit
				classNames={{
					enterActive: 'ModalOpen',
					exitActive: 'ModalClosed'
				}}
			>
				<div className='Modal'>
					<h1>A Modal</h1>
					<button className="Button" onClick={props.closed}>
						Dismiss
					</button>
				</div>
			</CSSTransition>
		</Fragment>
	);
};

export default modal;
