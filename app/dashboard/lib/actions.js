"use server"

import { auth, signIn } from '@/app/auth'
import { createNotification } from '@/app/dashboard/lib/utils'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const addUser = async (formData) => {
	const { username, password, role, isActive } = Object.fromEntries(formData);
	
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// запрос
	} catch (err) {
		console.log(err)
		throw new Error("Failed to create user!")
	}
	
	revalidatePath("/dashboard/users")
	redirect("/dashboard/users")
}

export const addNotification = async(formData) => {
	const { user } = await auth()
	const { text } = Object.fromEntries(formData);
	
	console.log(user)
	
	try {
		await createNotification(text, user.id, user.token)
	} catch (err) {
		console.log(err)
		throw new Error("Failed to create notification!")
	}
	
	revalidatePath("/dashboard")
	redirect("/dashboard")
}

export const deleteUser = async(formData) => {
	const { id } = Object.fromEntries(formData);
	
	try {
		// запрос await
		
	} catch (err) {
		console.log(err)
		throw new Error("Failed to delete user!")
	}
}

export const updateUser = async (formData) => {
	const { username, password, role, isActive } = Object.fromEntries(formData);
	
	try {
		const updateFields = {
			username,
			password,
			role,
			isActive
		}
		
		Object.keys(updateFields).forEach((key) =>
			(updateFields[key] === "" || undefined) && delete updateFields[key])
		
		// await запрос
	} catch (err) {
		console.log(err)
		throw new Error("Failed to update user!")
	}
	
	revalidatePath("/dashboard/users")
	redirect("/dashboard/users")
}

export const deleteNotification = async(formData) => {
	const { id } = Object.fromEntries(formData);
	
	try {
		// запрос await
		
	} catch (err) {
		console.log(err)
		throw new Error("Failed to delete notification!")
	}
}

export const updateNotification = async (formData) => {
	const { text } = Object.fromEntries(formData);
	
	try {
		const updateFields = {
			text
		}
		
		Object.keys(updateFields).forEach((key) =>
			(updateFields[key] === "" || undefined) && delete updateFields[key])
		
		// await запрос
	} catch (err) {
		console.log(err)
		throw new Error("Failed to update notification!")
	}
	
	revalidatePath("/dashboard")
	redirect("/dashboard")
}

export const fetchUser = async(id) => {
	try {
		// const user = await
		// return user
	} catch (err) {
		console.log(err)
		throw new Error("Failed to fetch user!")
	}
}

export const fetchNotification = async(id) => {
	try {
		// const notification = await
		// return user
	} catch (err) {
		console.log(err)
		throw new Error("Failed to fetch product!")
	}
}

export const authenticate = async (prevState, formData) => {
	const {login, password} = Object.fromEntries(formData)
	
	try {
		await signIn("credentials", { login, password })
	} catch (err) {
		console.log(err)
		return "Неправильные данные!"
	}
}