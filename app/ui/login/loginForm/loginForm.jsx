"use client"

import { authenticate } from '@/app/dashboard/lib/actions'
import styles from './loginForm.module.css'
import {useFormState} from "react-dom"

const LoginForm = () => {
	const [state, formAction] = useFormState(authenticate, undefined)
	
	return (
		<form action={formAction} className={styles.form}>
			<h1>Вход</h1>
			<input type="text" placeholder="Имя пользователя" name="login"/>
			<input type="password" placeholder="Пароль" name="password"/>
			<button>Войти</button>
			{state && state}
		</form>
	)
}

export default LoginForm