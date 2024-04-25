import { getSession } from 'next-auth/react'

export const fetchUsers = async (token) => {
	try {
		const response = await fetch(`${process.env.BASE_URL}/security`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
};

export const createNotification = async (text, id, token) => {
	console.log(text, id)
	try {
		const response = await fetch(`${process.env.BASE_URL}/notification?text=${text}&senderId=${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching notifications:', error);
		throw new Error(error);
	}
}

export const fetchNotifications = async (token) => {
	try {
		const response = await fetch(`${process.env.BASE_URL}/notification`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		return data
	} catch (error) {
		console.error('Error fetching notifications:', error);
		throw new Error(error);
	}
};
