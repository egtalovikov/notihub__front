import { fetchNotifications, fetchUsers } from '@/app/dashboard/lib/utils'
import { getSession } from 'next-auth/react'

export const getUsers = async (token) => {
	// const regex = new RegExp(q, 'i')
	
	const ITEM_PER_PAGE = 10
	
	try {
		const users = await fetchUsers(token);
		return users
	} catch (err) {
		console.log(err)
		throw new Error("Failed to fetch users!")
	}
}

export const getNotifications = async (q) => {
	const session = await getSession();
	const token = session?.accessToken;
	const regex = new RegExp(q, 'i')
	
	const ITEM_PER_PAGE = 10
	
	try {
		const notifications = await fetchNotifications(token.token);
		return notifications
	} catch (err) {
		console.log(err)
		throw new Error("Failed to fetch users!")
	}
}