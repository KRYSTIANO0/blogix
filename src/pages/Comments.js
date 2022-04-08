import React, { useEffect } from 'react'
//styles
import styles from './styles_pages/Comments.module.css'
//comments
import Comment from '../components/Comment/Comment'
import AddComment from '../components/Comment/AddComment'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments } from '../store/slices/commentSlice'

const Comments = () => {
	const comments = useSelector(state => state.comment.comments)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAllComments())
	}, [dispatch])
	return (
		<section className={styles['comments-section']}>
			<ul>
				{comments.map(comment => {
					return <Comment type='add' key={comment.id} {...comment} />
				})}
			</ul>
			<AddComment action={'add'} />
		</section>
	)
}

export default Comments
