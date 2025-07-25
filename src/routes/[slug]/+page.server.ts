import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import { verifyToken } from "$lib/server/tokens/jwt";
import { getUserById } from "$lib/db/queries/getUser/getUserById";
import { getPostsByUser } from "$lib/server/api/posts/getPostsByUser";
import { getLocationData } from "$lib/server/api/geo";

export const load: PageServerLoad = async ({locals, cookies}: {locals: any, cookies: any}) => {
    let user;
    let posts: Location[];
    let cookie = await cookies.get('jwt')
    
    if(cookie !== null){
        const pool = await locals.db()
        cookie = await verifyToken(cookie)
        if(cookie?.user_id){
            try{
                user = await getUserById(pool, cookie.user_id)
                if(user.location?.coords && !user.location?.name){
                    const userLoc = await getLocationData(user.location.coords)
                    if(userLoc){
                        user.location = userLoc
                    }
                }
                // posts = await getPostsByUser(user.id)
                posts = []
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

