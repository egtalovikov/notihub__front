import { auth, signOut } from '@/app/auth'
import MenuLink from '@/app/ui/dashboard/sidebar/menuLink/menuLink'
import Image from 'next/image'
import { MdDashboard, MdHelpCenter, MdLogout, MdSupervisedUserCircle } from 'react-icons/md'
import styles from './sidebar.module.css'

const menuItems = [
	{
		title: "Страницы",
		list: [
			{
				title: 'Панель управления',
				path: '/dashboard',
				icon: <MdDashboard />
			},
			{
				title: 'Пользователи',
				path: '/dashboard/users',
				icon: <MdSupervisedUserCircle />
			}
		]
	},
	{
		title: "Пользователь",
		list: [
			{
				title: 'Настройки',
				path: '/dashboard/settings',
				icon: <MdDashboard />
			},
			{
				title: 'Помощь',
				path: '/dashboard/help',
				icon: <MdHelpCenter />
			},
		]
	},
]

const Sidebar = async () => {
	const { user } = await auth()
	
	return (
		<div className={styles.container}>
			<div className={styles.user}>
				<Image
					className={styles.userImage}
					src={user.img || "/noavatar.png"}
					alt=""
					width="50"
					height="50"
				/>
				<div className={styles.userDetail}>
					<span className={styles.username}>{user.username}</span>
					<span className={styles.userTitle}>{user.role === 'ADMIN' ? "Администратор" : user.role === 'EMPLOYEE' ? "Сотрудник" : user.role === 'USER' && "Пользователь"}</span>
				</div>
			</div>
			<ul className={styles.list}>
			{menuItems.map(category => (
			<li key={category.title}>
				<span className={styles.category}>{category.title}</span>
				{category.list.map(item => (
					<MenuLink item={item} key={item.title} />
				))}
			</li>
			))}
			</ul>
			<form action={async () => {
				"use server"
				await signOut()
			}}>
				<button className={styles.logout}>
					<MdLogout/>
					Выйти
				</button>
			</form>
		</div>
	)
}

export default Sidebar