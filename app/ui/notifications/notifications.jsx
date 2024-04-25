import { auth } from '@/app/auth'
import { deleteNotification } from '@/app/dashboard/lib/actions'
import { fetchNotifications } from '@/app/dashboard/lib/utils'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Search from '@/app/ui/dashboard/search/search'
import Image from 'next/image'
import Link from 'next/link'
import styles from './notifications.module.css'
import searchParams from 'next/navigation'

const Notifications = async () => {
	const q = searchParams?.q || ""
	const page = searchParams?.page || 1;
	const { user } = await auth()
	
	const notifications = await fetchNotifications(user.token)
	
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<Search placeholder="Найти уведомление..."/>
				<Link href="/dashboard/notifications/add">
					<button className={styles.addButton}>Добавить новое</button>
				</Link>
			</div>
			<table className={styles.table}>
				<thead>
				<tr>
					<td>Пользователь</td>
					<td>Дата</td>
					<td>Текст</td>
				</tr>
				</thead>
				<tbody>
				{notifications?.notifications.map(notification => (
					<tr key={notification.id}>
						<td>
							<div className={styles.user}>
								<Image src={notification.avatar || '/noavatar.png'} alt="" width={40} height={40} className={styles.userImage}/>
								{notification.sender.login}
							</div>
						</td>
						<td>{notification.createdAt.toString()}</td>
						<td>{notification.text}</td>
						<td>
							<div className={styles.buttons}>
								<Link href={`/dashboard/notifications/${notification.id}`}>
									<button className={`${styles.button} ${styles.view}`}>Редактировать</button>
								</Link>
								<form action={deleteNotification}>
									<input type="hidden" name="id" value={notification.id}/>
									<button className={`${styles.button} ${styles.delete}`}>Удалить</button>
								</form>
							</div>
						</td>
					</tr>
				))}
				</tbody>
			</table>
			{/* <Pagination count={notifications && notifications[0].count}/> */}
		</div>
	)
}

export default Notifications