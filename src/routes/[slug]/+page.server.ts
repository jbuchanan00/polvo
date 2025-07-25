import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import { getUserById } from "$lib/db/queries/getUser/getUserById";
import { getPostsByUser } from "$lib/server/api/posts/getPostsByUser";
import { getLocationData } from "$lib/server/api/geo";
import { base } from "$app/paths";

export const load: PageServerLoad = async ({locals}: {locals: any, cookies: any}) => {
    let user;
    let posts: Location[];
    if(locals.user){
        try{
            const pool = await locals.db()
            console.log(locals.user.id)
            user = await getUserById(pool, locals.user.id)
            if(user.location?.coords && !user.location?.name){
                const userLoc = await getLocationData(user.location.coords)
                if(userLoc){
                    user.location = userLoc
                }
            }
            // posts = await getPostsByUser(user.id)
            posts = []
            pool.release()
        }catch(e){
            console.log('Error getting user by id, ', JSON.stringify(e))
            return {failed: fail(500)}
        }
    }else {
        throw redirect(303, `${base}/welcome/auth`) 
    }
    return {
        user,
        posts
    }
}

