import dotenv from 'dotenv'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { base } from '$app/paths'




dotenv.config()

export const GET: RequestHandler = async ({url, cookies}) => {
    const state = crypto.randomUUID()
    const rawParams = {
            client_id: process.env.GOOGLE_CLIENT_ID!,
            redirect_uri: `http://localhost:5173${base}/auth/google/callback`,
            response_type: 'code',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
            state: state
        }

    const params = new URLSearchParams(rawParams)

    throw redirect(302, `${process.env.GOOGLE_AUTH_URI}?${params.toString()}`)
}