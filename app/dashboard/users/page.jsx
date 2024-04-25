import { auth } from '@/app/auth'
import { deleteUser } from '@/app/dashboard/lib/actions'
import { getUsers } from '@/app/dashboard/lib/data'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Search from '@/app/ui/dashboard/search/search'
import styles from "@/app/ui/dashboard/users/users.module.css"
import Image from 'next/image'
import Link from 'next/link'

const UsersPage = async ({ searchParams }) => {
	const q = searchParams?.q || ""
	const page = searchParams?.page || 1
	const { user } = await auth()
	const users = await getUsers(user.token)
	console.log(users)
	
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Search placeholder="Найти пользователя..." />
				<Link href="/dashboard/users/add">
					<button className={styles.addButton}>Добавить нового</button>
				</Link>
			</div>
			<table className={styles.table}>
				<thead>
				<tr>
					<td>Имя</td>
					<td>Роль</td>
					<td>Статус</td>
					<td>Действия</td>
				</tr>
				</thead>
				<tbody>
				{users.securities.map((user) => (
					<tr key={user.id}>
						<td>
							<div className={styles.user}>
								<Image
									src={user.img || "/noavatar.png"}
									alt=""
									width={40}
									height={40}
									className={styles.userImage}
								/>
								{user.username}
							</div>
						</td>
						<td>{user.role}</td>
						<td>{user.status ? "Активный" : "Неактивный"}</td>
						<td>
							<div className={styles.buttons}>
								<Link href={`/dashboard/users/${user.id}`}>
									<button className={`${styles.button} ${styles.view}`}>Редактировать</button>
								</Link>
								<form action={deleteUser}>
									<input type="hidden" name="id" value={user.id} />
									<button className={`${styles.button} ${styles.delete}`}>Удалить</button>
								</form>
							</div>
						</td>
					</tr>
				))}
				</tbody>
			</table>
			{/* <Pagination count={users[0].count}/> */}
		</div>
	)
}

export default UsersPage