import { resolve } from "$app/paths";
import { setupProfilePage } from "$lib/server/api/pages/profilePage";
import type { RequestHandler } from "@sveltejs/kit";



export const GET: RequestHandler = async ({url, locals, params}) => {
    let profilePage: ProfileDto | string
    let isSelf = false
    
    if(locals.user.id){
        if(params.slug === locals.user.id){
            isSelf = true
        }

        const pool = await locals.db()

        profilePage = await setupProfilePage(pool, {userId: locals.user.id, isSelf})

        if(typeof profilePage === 'string'){
            return new Response(profilePage)
        }

        profilePage = profilePage as ProfileDto
    }else {
        return new Response("Failed to see locals", {status: 400})
    }
    
    return new Response(JSON.stringify({
        user: profilePage.user,
        posts: profilePage.posts,
        isSelf: profilePage.isSelf,
        profilePicture: profilePage.profilePicture,
        pictureExt: profilePage.pictureExt,
        userInstagramAuthed: profilePage.userInstagramAuthed,
        oauthUrl: profilePage.oauthUrl
    }))
}