import React from 'react'
//styles
import styles from './styles_UI/Card.module.css'
const Card = props => {
	return <div className={`${styles['card']} ${props.className}`}>{props.children}</div>
}

export default Card
