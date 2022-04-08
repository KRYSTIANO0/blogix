import React from 'react'
//styles
import styles from './styles_UI/Button.module.css'

const Button = props => {
	return (
		<button type={props.type} onClick={props.onClick} className={`${styles['ui-button']} ${props.className}`}>
			{props.children}
		</button>
	)
}

export default Button
