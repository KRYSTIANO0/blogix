import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const addReply = createAsyncThunk('reply/addReply', async data => {
	const res = await fetch(`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${data.userReplID}/replys.json`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	if (res.ok) {
		const message = 'deleted'
		return { message }
	}
})
export const deleteReply = createAsyncThunk('reply/deleteReply', async data => {
	const resp = await fetch(
		`https://blogix-5fbae-default-rtdb.firebaseio.com/comments/${data.id}/replys/${data.idRepl}.json`,
		{
			method: 'DELETE',
		}
	)
	if (resp.ok) {
		const message = 'deleted'
		return { message }
	}
})

const initialReplyState = {
	replys: [],
}

export const replySlice = createSlice({
	name: 'reply',
	initialState: initialReplyState,

	extraReducers: {
		[deleteReply.fulfilled]: (state, action) => {
			state.replys.push(action.payload.message)
		},
		[addReply.fulfilled]: (state, action) => {
			state.replys.push(action.payload.message)
		},
	},
})

export const replyActions = replySlice.actions
