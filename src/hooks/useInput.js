import  { useState } from 'react'
//styles
import styles from '../components/Forms/styles_forms/LogInForm.module.css'

const useInput = validation => {
	const [value, setValue] = useState('')
	const [isTouched, setIsTouched] = useState(false)

	const valueIsValid = isTouched && validation(value)
	const valueisInValid = isTouched && !valueIsValid

	const onChangeHandler = e => {
		setValue(e.target.value)
	}
	const onBlurHandler = () => {
		setIsTouched(true)
	}
	const valueClassses = `${styles['box']} ${valueIsValid && styles['isValid']} ${valueisInValid && styles['isInValid']}`
	return {
		value,
		valueIsValid,
		valueisInValid,
		onChangeHandler,
		onBlurHandler,
		valueClassses,
	}
}

export default useInput
