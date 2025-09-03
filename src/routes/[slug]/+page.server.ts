import { fail, redirect, type Action, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import { getUserById } from "$lib/db/queries/user/gets/getUserById";
import { getPostsByUser } from "$lib/server/api/posts/getPostsByUser";
import { getLocationData } from "$lib/server/api/geo";
import { base, resolve } from "$app/paths";
import editUserBio from "$lib/server/api/users/editUserBio";

export const load: PageServerLoad = async ({locals, params, fetch}: {locals: any, params: any, fetch: any}) => {
    let user;
    let posts: Location[];
    let profilePicture;
    let isSelf = false;
    
    if(locals.user){
        if(params.slug === locals.user.id){
            isSelf = true
        }
        try{
            const pool = await locals.db()
            user = await getUserById(pool, params.slug)
            if(user.location?.coords && !user.location?.name){
                const userLoc = await getLocationData(user.location.coords)
                if(userLoc){
                    user.location = userLoc
                }
            }
            try{
                profilePicture = await fetch(`${resolve(`/avatar?userId=${params.slug}`)}`)
                profilePicture = (await profilePicture.json())[0]
                console.log('PICTURE', profilePicture)
            }catch(e){
                console.log('Error pulling picture', e)
            }
            // posts = await getPostsByUser(user.id)
            posts = []
            pool.release()
        }catch(e){
            console.log('Catching getting user')
            if(isSelf){
                await fetch(`${base}/logout`,{
                    method: "DELETE"
                })
                throw redirect(303, `${base}/welcome/auth`)
            }
            
            throw redirect(303, `${base}/home`)
        }
    }else {
        throw redirect(303, `${base}/welcome/auth`)
    }
    return {
        user,
        posts,
        isSelf,
        profilePicture
    }
}

export const actions: Actions = {
    submitBio: async ({request, locals}) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        let {bio} = form as {
            bio: string
        }

        try{
            const pool = await locals.db()
            await editUserBio(pool, {id: locals.user.id, bio})
        }catch(e){
            console.error('Error caught in action')
        }
    }
}

