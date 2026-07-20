import { getMetaLLAuth } from "$lib/db/queries/authorization/getMetaLLAuth";
import { decrypt } from "$lib/server/api/helpers";
import { getLLTokenAndId, setLLToken } from "$lib/server/api/tokens";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ locals, url }) => {
    const userId = url.searchParams.get("id")
    if (!userId) {
        return new Response("No id", { status: 400 })
    }

    const mockToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1vcWFwaS0xIn0'

    const pool = await locals.db()

    try {
        // const setRes = await setLLToken(pool, userId, mockToken)

        // console.log("Res for input", setRes)

        const getRes = await getLLTokenAndId(pool, userId, '*')
        if (!getRes) {
            return new Response("No token found")
        }

        const token = decrypt(getRes.token, getRes.iv, getRes.tag)

        return new Response(JSON.stringify({ "token": token }))
    } catch (e) {
        console.log("Error, ", e)
        return new Response("Error: " + e)
    } finally {
        pool.release()
    }
}