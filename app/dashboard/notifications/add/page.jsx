import { addNotification } from '@/app/dashboard/lib/actions'
import styles from "@/app/ui/notifications/addNotification/addNotification.module.css"

const AddNotificationPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<form action={addNotification} className={styles.form}>
					<label>Текст уведомления</label>
					<input type="text" placeholder="Текст" name="text" required />
					<button type="submit">Сохранить</button>
				</form>
			</div>
		</div>
	)
}

export default AddNotificationPage