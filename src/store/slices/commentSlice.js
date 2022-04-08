import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const commentsURL = 'https://blogix-5fbae-default-rtdb.firebaseio.com/comments.json'

export const getAllComments = createAsyncThunk('comments/getAllComments', async () => {
	const response = await fetch(commentsURL)
	if (response.ok) {
		const data = await response.json()
		let comments = []
		for (const key in data) {
			comments.push({
				id: key,
				...data[key],
			})
		}
		return { comments }
	}
})
export const addComment = createAsyncThunk('comments/addComment', async data => {
	const res = await fetch(commentsURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})

	if (res.ok) {
		const postedData = await res.json()
		const comment = {
			...data,
			id: postedData.name,
		}
		return { comment }
	}
})
export const deleteComment = createAsyncThunk('comments/deleteComment', async data => {
	const commID = data.commID
	console.log(commID)
	const response = await fetch(`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${data.commID}.json`, {
		method: 'DELETE',
	})
	if (response.ok) {
		return { commID }
	}
})
export const likeComment = createAsyncThunk('comments/likeComment', async data => {
	await fetch(`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${data.id}/score.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user: data.userID }),
	})
})
export const unlikeComment = createAsyncThunk('comments/likeComment', async data => {
	await fetch(`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${data.id}/score/${data.scoreID}.json`, {
		method: 'DELETE',
	})
})
const initialCommentState = {
	comments: [],
	likes: [],
	deleteShowState: null,
}

export const commentSlice = createSlice({
	name: 'comment',
	initialState: initialCommentState,
	reducers: {
		toggleDelete(state) {
			state.deleteShowState = !state.deleteShowState
		},
	},
	extraReducers: {
		[getAllComments.fulfilled]: (state, action) => {
			state.comments = action.payload.comments
		},
		[addComment.fulfilled]: (state, action) => {
			state.comments.push(action.payload.comment)
		},
		[deleteComment.fulfilled]: (state, action) => {
			state.comments = state.comments.filter(comment => comment.id !== action.payload.commID)
		},
	},
})

export const commentActions = commentSlice.actions
