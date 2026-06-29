import { deleteUser } from "$lib/db/queries/user/deletes/deleteUser";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({locals, url}) => {
    let id = url.searchParams.get("id")

    if(!id || id == ''){
        return new Response("No id", {status: 400})
    }

    const pool = await locals.db();

    try{
        const res = await deleteUser(pool, "id", id)
        if(res == 'ok'){
            return new Response("OK", {status: 200})
        }else{
            return new Response("Error Deleting User")
        }
    }catch(e){
        return new Response("Error Deleting User", {status: 500})
    }finally{
       pool.release()
    }
}