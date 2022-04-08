import React, { useState } from 'react'
//styles
import styles from './styles_pages/Profile.module.css'
//components
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
//redux
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//components
import AvatarMenu from '../components/Profile/AvatarMenu'

const Profile = () => {
	const [showAvatarMenu, setShowAvatarMenu] = useState(false)

	const user = useSelector(state => state.user.user)
	const isLogIn = useSelector(state => state.user.isLogIn)

	return (
		<section className={styles['profile']}>
			<Card>
				{isLogIn ? (
					<>
						<img className='global-avatar-image' src={user.image} alt='avatar' />
						<div>
							<Button onClick={() => setShowAvatarMenu(true)} className={styles['avatar-btn']}>
								Change Avatar
							</Button>
						</div>
						{showAvatarMenu && <AvatarMenu />}
						<h1>
							<p>nick:</p>
							{user.nick}
						</h1>
						<h1>
							<p>email:</p>
							{user.email}
						</h1>
					</>
				) : (
					<>
						<h1>You must log in to see your profile</h1>
						<Link to='/login'>
							<Button className={styles['sign-in-btn']}>log in</Button>
						</Link>
					</>
				)}
			</Card>
		</section>
	)
}

export default Profile
