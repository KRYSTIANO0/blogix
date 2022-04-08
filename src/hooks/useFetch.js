import { useEffect, useState } from 'react'

const useGetData = url => {
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setIsErrorMessage] = useState(false)
	const [data, setData] = useState([])

	const fetchData = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error('Something goes wrong!')
			}
			const data = await response.json()

			let fetchedData = []
			for (const key in data) {
				console.log(data[key].score)
				fetchedData.push({
					image: data[key].image,
					id: data[key].id,
				})
			}
			setData(fetchedData)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setIsErrorMessage(error.message)
		}
	}
	
	useEffect(() => {
		fetchData()
	}, [])

	return {
		isLoading,
		errorMessage,
		data,
	}
}

export default useGetData
