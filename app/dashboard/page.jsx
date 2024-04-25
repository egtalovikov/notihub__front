import Notifications from '@/app/ui/notifications/notifications'
import styles from "../ui/dashboard/dashboard.module.css"

const Dashboard = () => {
	return (
		<div className={styles.wrapper}>
				<Notifications />
		</div>
	)
}

export default Dashboard