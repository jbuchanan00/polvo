import dotenv from 'dotenv'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { getRedis } from '$lib/server/redis'
import {randomBytes} from 'node:crypto'

dotenv.config()

export const GET: RequestHandler = async ({locals}) => {

    const userId = locals.user.id
    const state = randomBytes(16).toString('hex')

    const r = getRedis()
    await r.set(`ig:state:${state}`, JSON.stringify({userId, state}), {EX: 600})

    const rawParams = {
            force_reauth: 'true',
            client_id: process.env.INSTAGRAM_CLIENT_ID!,
            redirect_uri: `https://app.inked-out.com/profile/auth/meta/callback`,
            response_type: 'code',
            scope: 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights',
            state
        }

    const params = new URLSearchParams(rawParams)
    throw redirect(302, `${process.env.META_AUTH_URI}?${params.toString()}`)
}