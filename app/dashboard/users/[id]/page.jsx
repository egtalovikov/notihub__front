import { fetchUser, updateUser } from '@/app/dashboard/lib/actions'
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import Image from 'next/image'

const SingleUserPage = async ({ params }) => {
	const { id } = params;
	// const user = await fetchUser(id)
	
	const user = {
		username: "123",
		img: null,
		role: "ADMIN",
		isActive: true
	}
	
	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.imgContainer}>
					<Image
						src={user.img || "/noavatar.png"} alt="" fill />
				</div>
				{user.username}
			</div>
			<div className={styles.formContainer}>
				<form action={updateUser} className={styles.form}>
					<input type="hidden" name="id" value={user.id} />
					<label>Имя пользователя</label>
					<input type="text" name="username" placeholder={user.username}/>
					<label>Пароль</label>
					<input type="password" name="password"/>
					<label>Роль</label>
					<select name="role" id="role">
						<option value="admin" selected={user.role === 'ADMIN' && true}>Администратор</option>
						<option value="employee" selected={user.role === 'EMPLOYEE' && true}>Сотрудник</option>
						<option value="user" selected={user.role === 'USER' && true}>Пользователь</option>
					</select>
					<label>Активен?</label>
					<select name="isActive" id="isActive">
						<option value={true} selected={user.isActive}>Да</option>
						<option value={false} selected={!user.isActive}>Нет</option>
					</select>
					<button>Обновить</button>
				</form>
			</div>
		</div>
	)
}

export default SingleUserPage