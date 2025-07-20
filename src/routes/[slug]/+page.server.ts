import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import { verifyToken } from "$lib/server/tokens/jwt";
import { getUserById } from "$lib/db/queries/getUser/getUserById";

export const load: PageServerLoad = async ({locals, cookies}: {locals: any, cookies: any}) => {
    let user;
    let cookie = await cookies.get('jwt')
    
    if(cookie !== null){
        const pool = await locals.db()
        cookie = await verifyToken(cookie)
        if(cookie?.userId){
            // try{
            //     user = await getUserById(pool, cookie.userId.user_id)
            // }catch(e){
            //     console.log('Error getting user by id, ', JSON.stringify(e))
            //     return fail(400, {message: 'something wrong'})
            // }
        }else{
            throw redirect(303, '/welcome/auth')
        }
    }else {
        throw redirect(303, '/welcome/auth') 
    }
    return {
        user
    }
}

