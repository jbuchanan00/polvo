import { removeMetaAuth } from "$lib/db/queries/authorization/removeMetaAuth";
import type { RequestHandler } from "@sveltejs/kit";



export const GET: RequestHandler = async ({ url, locals }) => {
    const id = url.searchParams.get("id")

    if (!id || id == "") {
        return new Response("No id included", { status: 400 })
    }

    const pool = await locals.db()

    try {
        const res = await removeMetaAuth(pool, id, 'meta')
        return new Response(JSON.stringify(res.rows[0]))
    } catch (e) {
        console.log("Error removing user meta information", e)
        return new Response("Error removing meta authorizations", { status: 500 })
    } finally {
        pool.release()
    }
}