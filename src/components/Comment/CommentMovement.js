import React, { useEffect, useState } from 'react'
//styles
import styles from './styles_comments/CommentMovement.module.css'
//icons
import { FaReply, FaTrash } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
//components
import Delete from './Delete'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { likeComment, unlikeComment } from '../../store/slices/commentSlice'
import { commentActions } from '../../store/slices/commentSlice'
import AddComment from './AddComment'

const CommentMovement = ({ id, user, commUserID }) => {
	const [likes, setLikes] = useState(0)
	const [likedUsers, setLikedUsers] = useState()
	const [isLiked, setIsLiked] = useState(false)
	const [isReply, setIsReply] = useState(false)
	const userID = useSelector(state => state.user.user.localId)
	const isLogIn = useSelector(state => state.user.isLogIn)
	const deelteShowState = useSelector(state => state.comment.deleteShowState)

	const dispatch = useDispatch()

	const getLikes = async () => {
		const response = await fetch(`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${id}/score.json`)
		if (response.ok) {
			const data = await response.json()
			let likedUsers = []
			for (const key in data) {
				likedUsers.push({
					id: key,
					...data[key],
				})
			}
			const isLiked2 = likedUsers.find(user => user.user === userID)
			console.log(isLiked2)
			if (isLiked2) {
				setIsLiked(true)
			} else {
				setIsLiked(false)
			}
			setLikedUsers(likedUsers)
			setLikes(likedUsers.length)
		}
	}

	useEffect(() => {
		getLikes()
	}, [likes])

	const onLikeHandler = () => {
		if (isLogIn) {
			if (isLiked) {
				const score = likedUsers.find(user => user.user === userID)
				const scoreID = score.id
				setLikes(currVal => currVal - 1)
				setIsLiked(false)
				dispatch(unlikeComment({ id, userID, scoreID }))
			} else {
				setIsLiked(true)
				setLikes(currVal => currVal + 1)
				dispatch(likeComment({ id, userID }))
			}
		}
	}
	const onReplyHandler = () => {
		setIsReply(currVal => !currVal)
	}
	return (
		<>
			<div className={styles['comment-movement']}>
				<div className={styles['score']}>
					<button onClick={onLikeHandler} className={isLiked ? styles['active'] : null}>
						<FcLike />
					</button>
					<h2>{likes}</h2>
				</div>
				<div className={styles['reply']}>
					{commUserID === userID && (
						<button onClick={() => dispatch(commentActions.toggleDelete())} className={styles['delete-button']}>
							<h2>
								<FaTrash />
								Delete
							</h2>
						</button>
					)}
					<button onClick={onReplyHandler} className={styles['reply-button']}>
						<h2>
							<FaReply />
							Reply
						</h2>
					</button>
				</div>
			</div>
			{isReply && <AddComment userRepl={user} action={'reply'} userReplID={id} />}
			{deelteShowState && <Delete commID={id} />}
		</>
	)
}

export default CommentMovement
