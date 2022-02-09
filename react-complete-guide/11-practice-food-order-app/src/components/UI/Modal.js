import React, {Fragment} from 'react';
import ReactDOM from "react-dom";
import styles from './Modal.module.css'

function Backdrop(props) {
	return (
		<div className={styles.backdrop}/>
	)
}

function ModalOverlay(props) {
	return (
		<div className={styles.modal}>
			{props.children}
		</div>
	)
}

function Modal(props) {
	const portalElement = document.getElementById('overlays');

	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
}

export default Modal;
