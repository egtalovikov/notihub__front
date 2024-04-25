import { addUser } from '@/app/dashboard/lib/actions'
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css"

const AddUserPage = () => {
	const
	return (
		<div className={styles.container}>
			<form action={addUser} className={styles.form}>
				<input type="text" placeholder="Логин" name="username" required />
				<input type="password" placeholder="Пароль" name="password" required />
				<select name="role" id="role">
					<option value={""} selected>Роль</option>
					<option value="admin">Администратор</option>
					<option value="employee">Сотрудник</option>
					<option value="user">Пользователь</option>
				</select>
				<select name="isActive" id="isActive">
					<option value={true} selected>Активен?</option>
					<option value={true}>Да</option>
					<option value={false}>Нет</option>
				</select>
				<button type="submit">Сохранить</button>
			</form>
		</div>
	)
}

export default AddUserPage