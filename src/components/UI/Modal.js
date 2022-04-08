import React from 'react'
import ReactDom from 'react-dom'
//components
import Card from './Card'
//styles
import styles from './styles_UI/Modal.module.css'
const Modal = props => {
	return ReactDom.createPortal(
		<div className={`${styles['modal']} ${props.className}`}>
			<Card>{props.children}</Card>
		</div>,
		document.getElementById('overlays')
	)
}

export default Modal
