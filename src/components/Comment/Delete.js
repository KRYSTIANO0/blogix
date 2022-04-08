import React from 'react'
import { useNavigate } from 'react-router-dom'
//styles
import styles from './styles_comments/Delete.module.css'
//components
import Modal from '../UI/Modal'
import Button from '../UI/Button'
//redux
import { useDispatch } from 'react-redux'
import { commentActions } from '../../store/slices/commentSlice'
import { deleteComment } from '../../store/slices/commentSlice'
const Delete = commID => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onCancelHandler = () => {
		dispatch(commentActions.toggleDelete())
	}
	const onDeletehandler = () => {
		dispatch(deleteComment(commID))
		dispatch(commentActions.toggleDelete())
		navigate('/comments', { replace: true })
	}
	return (
		<Modal className={styles['delete-modal']}>
			<div className={styles['padding']}>
				<h1>Delete comment</h1>
				<p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
				<div className={styles['buttons']}>
					<Button onClick={onCancelHandler} className={styles['cancel-btn']}>
						no,cancel
					</Button>
					<Button onClick={onDeletehandler} className={styles['delete-btn']}>
						yes,delete
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default Delete
