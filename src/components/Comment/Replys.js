import React, { useEffect, useState } from 'react'
//styles
import styles from './styles_comments/Replys.module.css'
//components
import Comment from './Comment'
import Card from '../UI/Card'
//redux
import { useSelector } from 'react-redux'
const Replys = ({ id }) => {
	const [replys, setReplys] = useState([])
	const rerenderOnDelete = useSelector(state => state.reply.replys)
	const fetchReplys = async () => {
		const response = await fetch(`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${id}/replys.json`)
		if (response.ok) {
			const data = await response.json()

			let replys = []
			for (const key in data) {
				replys.push({
					idRepl: key,
					...data[key],
				})
			}
			setReplys(replys)
		}
	}
	useEffect(() => {
		console.log('dsads')
		fetchReplys()
	}, [rerenderOnDelete])

	let content

	if (replys.length === 0) {
		content = (
			<Card>
				<h1>No replyes yet.</h1>
			</Card>
		)
	} else if (replys) {
		content = (
			<div>
				{replys.map(reply => {
					return <Comment type='reply' key={reply.idRepl} id={id} {...reply} />
				})}
			</div>
		)
	}
	return <div className={styles['reply-card']}>{content}</div>
}

export default Replys
