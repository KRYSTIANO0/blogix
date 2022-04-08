import { configureStore } from '@reduxjs/toolkit'
//slices
import { userSlice } from './slices/userSlice'
import { commentSlice } from './slices/commentSlice'
import { replySlice } from './slices/replySlice'
const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		comment: commentSlice.reducer,
		reply: replySlice.reducer,
	},
})

export default store
