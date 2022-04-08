import React, { useState } from 'react'
//styles
import styles from './styles_comments/Comment.module.css'
//components
import Replys from './Replys'
import CommentMovement from './CommentMovement'
import Card from '../UI/Card'
//icons
import { FaTrash } from 'react-icons/fa'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { deleteReply } from '../../store/slices/replySlice'

const Comment = ({ content, createdAt, id, score, user, userAvatar, type, userID, idRepl }) => {
	const [showReplys, setShowReplys] = useState(false)

	const dispatch = useDispatch()
	const isLogIn = useSelector(state => state.user.isLogIn)
	const currUserId = useSelector(state => state.user.user.localId)

	const onShowReplysHandler = () => {
		setShowReplys(currVal => !currVal)
	}
	const deleteReplyHandler = () => {
		dispatch(deleteReply({ idRepl, id }))
	}
	return (
		<>
			<Card className={styles['comment']}>
				<div className={styles['author']}>
					<img className='global-avatar-image' src={userAvatar} alt='' />
					<h1>{user}</h1>
					{userID === currUserId && <h2>you</h2>}
					<p>{createdAt}</p>
					{userID === currUserId && type === 'reply' && (
						<button className={styles['delete-reply-btn']} onClick={deleteReplyHandler}>
							<FaTrash />
						</button>
					)}
				</div>
				<div className={styles['content']}>
					<p>{content}</p>
				</div>
				{isLogIn && type === 'add' && (
					<>
						<CommentMovement commUserID={userID} user={user} id={id} score={score} />
						<button className={styles['show-replys-btn']} onClick={onShowReplysHandler}>
							SHOW REPLYS
						</button>
					</>
				)}
			</Card>
			{showReplys && <Replys id={id} />}
		</>
	)
}

export default Comment
