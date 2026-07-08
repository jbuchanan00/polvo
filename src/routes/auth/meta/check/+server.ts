import { getMetaLLAuth } from "$lib/db/queries/authorization/getMetaLLAuth";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ url, locals }) => {
    const userId = url.searchParams.get("id")

    if (!userId || userId == "") {
        return new Response("No User ID", { status: 400 })
    }

    const pool = await locals.db();

    try {
        const res = await getMetaLLAuth(pool, userId)
        return new Response(JSON.stringify(res))
    } catch (e) {
        const message = "Error trying to determine if user is meta authed"
        console.log(message)
        return new Response(message, { status: 500 })
    } finally {
        pool.release()
    }
};