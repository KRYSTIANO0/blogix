import { createSlice } from '@reduxjs/toolkit'
const initialUserState = {
	isLogIn: null,
	user: {
		nick: '',
		email: '',
		localId: '',
		image: 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png',
	},
}
export const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		logIN(state, action) {
			state.isLogIn = true
			state.user.nick = action.payload.displayName
			state.user.email = action.payload.email
			state.user.localId = action.payload.localId
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logOut(state) {
			state.isLogIn = false
			state.user.nick = ''
			state.user.email = ''
			state.user.localId = ''
			localStorage.removeItem('user')
		},
		changeAvatar(state, action) {
			state.user.image = action.payload
		},
		resetAvatar(state) {
			state.user.image = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
		},
	},
})

export const userActions = userSlice.actions
