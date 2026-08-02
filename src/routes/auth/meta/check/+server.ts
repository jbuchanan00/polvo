import { getMetaLLAuth } from "$lib/db/queries/authorization/getMetaLLAuth";
import { decrypt } from "$lib/server/api/helpers/decrypt";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ url, locals }) => {
    const userId = url.searchParams.get("id")

    if (!userId || userId == "") {
        console.log("There is no user id")
        return new Response("No User ID", { status: 400 })
    }

    const pool = await locals.db();

    try {
        const res = await getMetaLLAuth(pool, userId)
        if (!res || !res.token) {
            return new Response(JSON.stringify({ "metatoken": null }))
        }
        const token = decrypt(res.token, res.iv, res.tag)
        return new Response(JSON.stringify({ "metatoken": "" }))

    } catch (e) {
        const message = "Error trying to determine if user is meta authed"
        console.log(message)
        return new Response(message, { status: 500 })
    } finally {
        pool.release()
    }
};