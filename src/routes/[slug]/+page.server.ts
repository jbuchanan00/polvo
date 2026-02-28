import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../edit/$types";
import {resolve} from '$app/paths'

import editUserBio from "$lib/server/api/users/editUserBio";
import { setupProfilePage } from "$lib/server/api/pages/profilePage";

export const load: PageServerLoad = async ({locals, params, fetch}: {locals: any, params: any, fetch: any}) => {
    let profilePage: ProfileDto | string
    let isSelf = false
    
    if(locals.user){
        if(params.slug === locals.user.id){
            isSelf = true
        }

        const pool = await locals.db()

        profilePage = await setupProfilePage(pool, {userId: locals.user.id, isSelf})

        if(profilePage === "logout"){
            await fetch(`${resolve('/logout')}`,{
                method: "DELETE"
            })
            throw redirect(303, `${resolve('/welcome/auth')}`)
        }else if(profilePage === "Failed getting user"){
            throw redirect(404, `${resolve('/home')}`)
        }

        profilePage = profilePage as ProfileDto
    }else {
        throw redirect(303, `${resolve('/welcome/auth')}`)
    }
    
    return {
        user: profilePage.user,
        posts: profilePage.posts,
        isSelf: profilePage.isSelf,
        profilePicture: profilePage.profilePicture,
        pictureExt: profilePage.pictureExt,
        userInstagramAuthed: profilePage.userInstagramAuthed,
        oauthUrl: profilePage.oauthUrl
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

