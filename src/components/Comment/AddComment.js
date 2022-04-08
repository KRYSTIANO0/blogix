import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
//styles
import styles from './styles_comments/AddComment.module.css'
//components
import Card from '../UI/Card'
import Button from '../UI/Button'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/slices/commentSlice'
import { addReply } from '../../store/slices/replySlice'
import { replyActions } from '../../store/slices/replySlice'
const AddComment = ({ action, userRepl, userReplID }) => {
	const isLogin = useSelector(state => state.user.isLogIn)
	const user = useSelector(state => state.user.user)
	const nick = useSelector(state => state.user.user.nick)
	const image = useSelector(state => state.user.user.image)

	const commentRef = useRef()

	const dispatch = useDispatch()
	let content
	if (isLogin) {
		const year = new Date().getFullYear()
		const month = new Date().getMonth() + 1
		const day = new Date().getDate()

		const addCommentHandler = e => {
			e.preventDefault()
			dispatch(
				addComment({
					content: commentRef.current.value,
					createdAt: year + '-' + month + '-' + day,
					user: user.nick,
					userID: user.localId,
					userAvatar: user.image,
				})
			)
		}
		const replyCommentHandler = e => {
			e.preventDefault()
			dispatch(
				addReply({
					userReplID,
					content: commentRef.current.value,
					createdAt: year + '-' + month + '-' + day,
					user: user.nick,
					userID: user.localId,
					userAvatar: user.image,
				})
			)
		}
		content = (
			<form className={styles['able-comment']} onSubmit={action === 'reply' ? replyCommentHandler : addCommentHandler}>
				<textarea
					name='comment'
					cols='30'
					rows='5'
					minLength={10}
					defaultValue={action === 'reply' ? `@${userRepl} ` : ''}
					placeholder={action === 'reply' ? `Add a reply to ...` : 'Add a comment...'}
					ref={commentRef}></textarea>
				<div className={styles['container']}>
					<div>
						<img className={styles['avatar-img']} src={image} alt='' />
						<h1>{nick}</h1>
					</div>
					<Button type='submit' className={styles['send-btn']}>
						{action === 'reply' ? 'reply' : 'send'}
					</Button>
				</div>
			</form>
		)
	} else {
		content = (
			<div className={styles['disable-comment']}>
				<h1>Login to add comment</h1>
				<Link to='/login'>
					<Button className={styles['log-in-btn']}>log in</Button>
				</Link>
			</div>
		)
	}
	return <Card>{content}</Card>
}

export default AddComment
