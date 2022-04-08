import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
//components
import Header from './components/Header'
import Loading from './components/Loading/Loading'
//redux
import { useDispatch } from 'react-redux'
import { userActions } from './store/slices/userSlice'
//pages
const Profile = React.lazy(() => import('./pages/Profile'))
const Comments = React.lazy(() => import('./pages/Comments'))
const LogIn = React.lazy(() => import('./pages/LogIn'))

function App() {
	const dispatch = useDispatch()
	const initialToken = localStorage.getItem('user')
	if (initialToken) {
		const dataLOGIN = JSON.parse(initialToken)
		dispatch(userActions.logIN(dataLOGIN))
	}

	return (
		<main>
			<Header />
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path='/' element={<Comments />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/comments' element={<Comments />} />
					<Route path='/login' element={<LogIn />} />
					<Route path='/*' element={<Navigate to='/' replace />} />
				</Routes>
			</Suspense>
		</main>
	)
}

export default App
