import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//styles
import styles from './styles_profile/AvatarMenu.module.css'
//components
import Modal from '../UI/Modal'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import Button from '../UI/Button'
//hooks
import useFetch from '../../hooks/useFetch'
//redux
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/slices/userSlice'

const avatarsURL = 'https://blogix-5fbae-default-rtdb.firebaseio.com/avatars.json'
const AvatarMenu = () => {
	const { data: avatars, isLoading, errorMessage } = useFetch(avatarsURL)
	const [avatarIndex, setAvatarIndex] = useState(0)
	const [choosenAvatar, setChoosenAvatar] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onChooseAvatarHandler = () => {
		dispatch(userActions.changeAvatar(choosenAvatar))
		navigate('/comments')
	}
	const onResetAvatarHandler = () => {
		dispatch(userActions.resetAvatar())
		navigate('/comments')
	}
	let content
	if (isLoading) {
		content = <Loading />
	}
	if (errorMessage) {
		content = <Error message={errorMessage} />
	}
	if (avatars) {
		console.log(avatars)

		content = (
			<section className={styles['avatars']}>
				{avatars.map((avatar, index) => {
					return (
						<img
							className={`${'global-avatar-image'} ${avatarIndex === index && styles['active']}`}
							src={avatar.image}
							alt='avatar'
							key={index}
							onClick={() => {
								setAvatarIndex(index)
								setChoosenAvatar(avatar.image)
							}}
						/>
					)
				})}
			</section>
		)
	}
	return (
		<Modal className={styles['avatar-menu']}>
			<header>
				<h1>choose your avatar</h1>
			</header>
			{content}
			<div className={styles['buttons']}>
				<Button onClick={onChooseAvatarHandler} className={styles['choose-btn']}>
					Choose
				</Button>
				<Button onClick={onResetAvatarHandler} className={styles['reset-btn']}>
					{' '}
					reset avatar
				</Button>
			</div>
		</Modal>
	)
}

export default AvatarMenu
