import dotenv from 'dotenv'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { getRedis } from '$lib/server/redis'
import { randomBytes } from 'node:crypto'
import { getMetaLLAuth } from '$lib/db/queries/authorization/getMetaLLAuth'
import { getLLTokenAndId } from '$lib/server/api/tokens'
import { decrypt } from '$lib/server/api/helpers'

dotenv.config()

export const GET: RequestHandler = async ({ url, locals }) => {
    const userId = url.searchParams.get("id");
    const state = randomBytes(16).toString('hex')

    if (!userId || userId == "") {
        return new Response("No User ID", { status: 400 })
    }

    const pool = await locals.db();

    try {
        const getRes = await getLLTokenAndId(pool, userId, '*')

        if (getRes) {
            const token = decrypt(getRes.token, getRes.iv, getRes.tag)
            return new Response(JSON.stringify({ "token": token }))
        }
    } catch (e) {
        const message = "Error trying to determine if user is meta authed"
        console.log(message)
        return new Response(message, { status: 500 })
    } finally {
        pool.release()
    }

    const r = getRedis()
    await r.set(`ig:state:${state}`, JSON.stringify({ userId, state }), { EX: 6000 })
    r.close()

    return new Response(JSON.stringify({ state }))
}