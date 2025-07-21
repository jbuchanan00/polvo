import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./edit/$types";
import { verifyToken } from "$lib/server/tokens/jwt";
import { getUserById } from "$lib/db/queries/getUser/getUserById";

export const load: PageServerLoad = async ({locals, cookies, request}: {locals: any, cookies: any, request: any}) => {
    let user;
    let cookie = cookies.get('jwt')
    if(cookie !== null){
        const pool = await locals.db()
        cookie = await verifyToken(cookie)
        if(cookie?.user_id){
            try{
                user = await getUserById(pool, cookie.user_id)
            }catch(e){
                console.log('Error getting user by id, ', JSON.stringify(e))
                return fail(400, {message: 'something wrong'})
            }
            throw redirect(303, `${user.id}`)
        }else{
            throw redirect(303, '/welcome/auth')
        }
    }else {
        throw redirect(303, '/welcome/auth') 
    }
}

