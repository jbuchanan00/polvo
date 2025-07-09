import dotenv from 'dotenv'
import { redirect, type RequestHandler } from '@sveltejs/kit'




dotenv.config()

export const GET: RequestHandler = async ({url, cookies}) => {
    const state = crypto.randomUUID()
    const mode = url.searchParams.get('mode')
    let rawParams
    if(mode === 'register'){
        rawParams = {
            client_id: process.env.GOOGLE_CLIENT_ID!,
            redirect_uri: 'http://localhost:5173/auth/google/callback/register',
            response_type: 'code',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
            state: state
        }
    }else if(mode === 'login'){
        rawParams = {
            client_id: process.env.GOOGLE_CLIENT_ID!,
            redirect_uri: 'http://localhost:5173/auth/google/callback/login',
            response_type: 'code',
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
            state: state
        }
    }

    const params = new URLSearchParams(rawParams)

    throw redirect(302, `${process.env.GOOGLE_AUTH_URI}?${params.toString()}`)
}