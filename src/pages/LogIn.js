import React from 'react'
import { Link } from 'react-router-dom'
//styles
import styles from './styles_pages/LogIn.module.css'
//components
import Modal from '../components/UI/Modal'
import AuthForm from '../components/Forms/AuthForm'
//icons
import { FaTimes } from 'react-icons/fa'
const LogIn = () => {
	
	return (
		<Modal>
			<section className={styles['log-in']}>
				<header>
					<h1>Welcome !</h1>
					<Link to='/'>
						<FaTimes />
					</Link>
				</header>

				<AuthForm />
			</section>
		</Modal>
	)
}

export default LogIn
