import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//styles
import styles from './styles_forms/LogInForm.module.css'
//components
import Button from '../UI/Button'
//icons
import { FaUserTie, FaLock, FaTeamspeak } from 'react-icons/fa'
//hooks
import useInput from '../../hooks/useInput'
//redux
import { userActions } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'

const AuthForm = () => {
	const [isLogin, setIsLogIn] = useState(true)
	const [ERROR, setIsERROR] = useState(false)

	const navigate = useNavigate()
	const dispatch = useDispatch()
	//validations
	const emailValidation = data => {
		return data.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
	}
	const emptyValidation = data => {
		return data.trim() !== ''
	}
	//email input
	const {
		value: email,
		valueIsValid: emailIsValid,
		onChangeHandler: onEmailChangehandler,
		onBlurHandler: onEmailBlurhandler,
		valueClassses: emailClasses,
	} = useInput(emailValidation)
	//password input
	const {
		value: password,
		valueIsValid: passwordIsValid,
		onChangeHandler: onPasswordChangehandler,
		onBlurHandler: onPasswordBlurhandler,
		valueClassses: passwordClasses,
	} = useInput(emptyValidation)
	const {
		value: confirmpassword,
		valueIsValid: confirmpasswordIsValid,
		onChangeHandler: onconfirmPasswordChangehandler,
		onBlurHandler: onconfirmPasswordBlurhandler,
		valueClassses: confirmpasswordClasses,
	} = useInput(emptyValidation)
	//nickname
	const {
		value: nickname,
		valueIsValid: nicknameIsValid,
		onChangeHandler: onNicknameChangehandler,
		onBlurHandler: noNicknameBlurhandler,
		valueClassses: nicknameClasses,
	} = useInput(emptyValidation)
	//classes
	const logInBtnClasses = `${styles['log-in-btn']} ${emailIsValid && passwordIsValid && styles['active']}`
	const createBtnClasses = `${styles['log-in-btn']} ${
		emailIsValid && passwordIsValid && confirmpasswordIsValid && nicknameIsValid && styles['active']
	}`

	//submit handler
	const onSubmitHandler = e => {
		e.preventDefault()

		let url
		if (isLogin) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkhf2IR4AgqzuScm9x3FsuTNuhcrDjSq0'
		} else {
			if (password !== confirmpassword) {
				setIsERROR("Passward doesn't match")
			} else {
				url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkhf2IR4AgqzuScm9x3FsuTNuhcrDjSq0'
			}
		}
		fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'aplication/json' },
			body: JSON.stringify({
				email,
				password,
				displayName: nickname,
				returnSecureToken: true,
			}),
		}).then(resp => {
			if (resp.ok) {
				console.log('login')

				return resp.json().then(data => {
					dispatch(userActions.logIN(data))
					navigate('/comments')
				})
			} else {
				return resp.json().then(data => {
					setIsERROR(data.error.message)
				})
			}
		})
	}

	return (
		<form className={styles['log-in-form']} onSubmit={onSubmitHandler}>
			{!isLogin && (
				<div className={nicknameClasses}>
					<FaTeamspeak />
					<input
						type='text'
						placeholder='Nickname'
						value={nickname}
						onChange={onNicknameChangehandler}
						onBlur={noNicknameBlurhandler}
					/>
				</div>
			)}
			<div className={emailClasses}>
				<FaUserTie />
				<input
					type='email'
					placeholder='E-mail'
					value={email}
					onChange={onEmailChangehandler}
					onBlur={onEmailBlurhandler}
				/>
			</div>

			<div className={passwordClasses}>
				<FaLock />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={onPasswordChangehandler}
					onBlur={onPasswordBlurhandler}
				/>
			</div>

			{!isLogin && (
				<div className={confirmpasswordClasses}>
					<FaLock />
					<input
						type='password'
						placeholder='Confirm Password'
						value={confirmpassword}
						onChange={onconfirmPasswordChangehandler}
						onBlur={onconfirmPasswordBlurhandler}
					/>
				</div>
			)}

			<p>{ERROR && ERROR}</p>

			<div className={styles['buttons']}>
				<Button type='submit' className={isLogin ? logInBtnClasses : createBtnClasses}>
					{isLogin ? 'log in' : 'create'}
				</Button>

				{isLogin && (
					<Button onClick={() => setIsLogIn(false)} className={styles['new-acc-btn']}>
						Create new account
					</Button>
				)}
			</div>
		</form>
	)
}

export default AuthForm
