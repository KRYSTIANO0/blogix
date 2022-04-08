import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
//styles
import styles from './styles_components/Header.module.css'
//components
import Button from './UI/Button'
//icons
import { TiThMenu } from 'react-icons/ti'
import { FaTimes } from 'react-icons/fa'
//redux
import { useSelector } from 'react-redux'
import { userActions } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'

const Header = () => {
	const [showMenu, setShowMenu] = useState(false)
	const isLogIn = useSelector(state => state.user.isLogIn)

	const dispatch = useDispatch()

	const menuBtnClickHandler = () => {
		setShowMenu(prevState => {
			return !prevState
		})
	}
	const logOutHandler = () => {
		dispatch(userActions.logOut())
	}
	return (
		<header className={styles['header']}>
			<div className={styles['logo']}>blogix</div>
			<div className={styles['navigation']}>
				<button className={styles['menu-btn']} onClick={menuBtnClickHandler}>
					{showMenu ? <FaTimes /> : <TiThMenu />}
				</button>
			</div>
			{showMenu && (
				<menu className={styles.menu}>
					{!isLogIn && (
						<Link to='/login'>
							<Button className={styles['sign-in-btn']}>log in</Button>
						</Link>
					)}
					{isLogIn && (
						<Button onClick={logOutHandler} className={styles['log-out-btn']}>
							log out
						</Button>
					)}
					<div className={styles['links']}>
						{isLogIn && (
							<NavLink className={styles['menu-item']} to='/profile'>
								my profile
							</NavLink>
						)}
						<NavLink className={styles['menu-item']} to='/comments'>
							comments
						</NavLink>
					</div>
				</menu>
			)}
		</header>
	)
}

export default Header
