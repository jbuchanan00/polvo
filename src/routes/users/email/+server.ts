import { getUserByEmail } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({url, locals}) => {
    console.log("Getting Users By Email")
    let i = +Date.now()
    const email = url.searchParams.get('email')

    if(!email || email.length < 1){
        return new Response("No Emails", {
            status: 400
        })
    }

    const pool = await locals.db()
    try{
        const res = await getUserByEmail(pool, email)
        // pool.release()
        console.log("Successfully Got Users By Emails in:", +Date.now()-i)
        return new Response(JSON.stringify(res))
    }catch(e){
        console.log("Error getting user by Email:", e)
        return new Response(
            "Error getting user by Email",
            {
                status: 500
            }
        )
    }finally{
        pool.release()
    }
}