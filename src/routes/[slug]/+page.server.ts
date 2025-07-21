import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import { verifyToken } from "$lib/server/tokens/jwt";
import { getUserById } from "$lib/db/queries/getUser/getUserById";
import { getPostsByUser } from "$lib/server/api/posts/getPostsByUser";

export const load: PageServerLoad = async ({locals, cookies}: {locals: any, cookies: any}) => {
    let user;
    let posts;
    let cookie = await cookies.get('jwt')
    
    if(cookie !== null){
        const pool = await locals.db()
        cookie = await verifyToken(cookie)
        if(cookie?.user_id){
            try{
                user = await getUserById(pool, cookie.user_id)
                posts = await getPostsByUser(user.id)
                console.log('POSTS', posts)
            }catch(e){
                console.log('Error getting user by id, ', JSON.stringify(e))
                return {status: 'fail', user: null, posts: null}
            }
        }else{
            throw redirect(303, '/welcome/auth')
        }
    }else {
        throw redirect(303, '/welcome/auth') 
    }
    return {
        user,
        posts
    }
}

