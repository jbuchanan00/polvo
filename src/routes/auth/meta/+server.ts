import dotenv from 'dotenv'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { resolve } from '$app/paths'


dotenv.config()

export const GET: RequestHandler = async () => {
    const rawParams = {
            client_id: process.env.INSTAGRAM_CLIENT_ID!,
            redirect_uri: `https://api.inked-out/auth/instagram/callback`,
            response_type: 'code',
            scope: 'instagram_business_content_publish'
        }

    const params = new URLSearchParams(rawParams)

    throw redirect(302, `${process.env.META_AUTH_URI}?${params.toString()}`)
}