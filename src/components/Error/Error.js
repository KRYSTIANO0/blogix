import React from 'react'
//styles
import styles from './Error.module.css'
const Error = ({ message }) => {
	return <div className={styles['error']}>{message}</div>
}

export default Error
