import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { authConfig } from './authconfig'

const login = async (credentials) => {
	try {
		const username = credentials.login
		const password = credentials.password
		const encodedCredentials = btoa(`${username}:${password}`);
		const response = await fetch(`https://api.notihub.otmetka-x.ru/security/login?login=${username}`, {
			headers: {
				'Authorization': `Basic ${encodedCredentials}`,
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
		
		const user = await response.json()
		
		if (!user) throw new Error("Wrong credentials!")
		return {user: user.security, token: user.security.token}
	} catch (err) {
		console.log(err)
		throw new Error("Failed to login!")
	}
}

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				try {
					const user = await login(credentials)
					return user
				} catch (err) {
					return null
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.username = user.user.login
				token.accessToken = user.token
				token.id = user.user.id
				token.role = user.user.role
			}
			return token;
		},
		async session({session, token}) {
			if (token) {
				session.user.id = token.id
				session.user.username = token.username
				session.user.token = token.accessToken
				session.user.role = token.role
			}
			return session
		},
	}
})