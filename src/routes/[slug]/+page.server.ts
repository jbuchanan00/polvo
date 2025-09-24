import { fail, redirect, type Action, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import { getUserById } from "$lib/db/queries/user/gets/getUserById";
import { getPostsByUser } from "$lib/server/api/posts/getPostsByUser";
import { getLocationData } from "$lib/server/api/geo";
import {resolve} from '$app/paths'

import editUserBio from "$lib/server/api/users/editUserBio";

export const load: PageServerLoad = async ({locals, params, fetch}: {locals: any, params: any, fetch: any}) => {
    let user;
    let posts: Post[];
    let profilePicture;
    let isSelf = false;
    let pictureExt;
    
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
                let data = await fetch(`${resolve(`/avatar?userId=${params.slug}`)}`)
                data = await data.json()
                
                if(data.profilePictures[0] !== ""){
                    profilePicture = data.profilePictures[0]
                    let datamap = new Map(Object.entries(data.extensions))
                    pictureExt = datamap.get(locals.user.id)
                }else{
                    profilePicture = ""
                    pictureExt = ""
                }
                
            }catch(e){
                console.log('Error pulling picture', e)
            }
            // posts = await getPostsByUser(user.id)
            posts = []
            pool.release()
        }catch(e){
            console.log('Catching getting user')
            if(isSelf){
                await fetch(`${resolve('/logout')}`,{
                    method: "DELETE"
                })
                throw redirect(303, `${resolve('/welcome/auth')}`)
            }
            
            throw redirect(404, `${resolve('/home')}`)
        }
    }else {
        throw redirect(303, `${resolve('/welcome/auth')}`)
    }
    
    return {
        user,
        posts,
        isSelf,
        profilePicture,
        pictureExt
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

