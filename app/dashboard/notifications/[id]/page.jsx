import { fetchNotification, updateNotification } from '@/app/dashboard/lib/actions'
import styles from "@/app/ui/notifications/singleNotification/singleNotification.module.css"

const SingleNotificationPage = ({ params }) => {
	const { id } = params;
	// const notification = fetchNotification(id)
	const notification = 'Test'
	
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<form action={updateNotification} className={styles.form}>
					<label>{notification.text}</label>
					<input type="text" name="text" placeholder="Текст" />
					<button>Обновить</button>
				</form>
			</div>
		</div>
	)
}

export default SingleNotificationPage