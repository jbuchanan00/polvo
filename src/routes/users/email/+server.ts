import { getUserByEmail } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({url, locals}) => {
    const email = url.searchParams.get('email')

    if(!email || email.length < 1){
        return new Response("No Emails", {
            status: 400
        })
    }

    try{
        const pool = await locals.db()
        const res = await getUserByEmail(pool, email)
        pool.release()
        return new Response(JSON.stringify(res))
    }catch(e){
        console.log("Error getting user by Email:", e)
        return new Response(
            "Error getting user by Email",
            {
                status: 500
            }
        )
    }
}