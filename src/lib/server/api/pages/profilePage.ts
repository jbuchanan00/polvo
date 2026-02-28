import { getUserById } from "$lib/db/queries/user/gets/getUserById";
import type { PoolClient } from "pg";
import { isUserAuthed } from "../authentication";
import { resolve } from "$app/paths";
import { getLocationData } from "../geo";
import { getPostsByUser } from "../posts";



export async function setupProfilePage(db: PoolClient, locals: {userId: string, isSelf: boolean}){
    const profilePage = new ProfileDto()

    profilePage.isSelf = locals.isSelf

    try{
        profilePage.user = await getUserById(db, locals.userId)
        if(locals.isSelf){
            profilePage.userInstagramAuthed = await isUserAuthed(db, profilePage.user.id, 'instagram')
            if(!profilePage.userInstagramAuthed){
                let res = await fetch(resolve('/auth/meta'))
                let oauthState = await res.json()
                profilePage.oauthUrl = `${process.env.META_OAUTH}&state=${oauthState.state}`
            }
        }
        if(profilePage.user.location?.coords && !profilePage.user.location?.name){
            profilePage.user.location = await getLocationData(profilePage.user.location.coords)
        }
        try{
            let data = await fetch(`${resolve(`/avatar?userId=${locals.userId}`)}`)
            let extractedData = await data.json()
            
            if(extractedData.profilePictures[0] !== ""){
                profilePage.profilePicture = extractedData.profilePictures[0]
                let datamap = new Map(Object.entries(extractedData.extensions))
                profilePage.pictureExt = datamap.get(locals.userId) as string
            }
            
        }catch(e){
            console.log('Error pulling picture', e)
        }
        try{
            profilePage.posts = await getPostsByUser(locals.userId, 0, 15)
            console.log('Posts for User:', profilePage.posts)
        }catch(e){
            console.log('Error getting posts for user', e)
        }
        db.release()
        return profilePage
    }catch(e){
        console.log('Catching getting user')
        if(profilePage.isSelf){
            console.log("Error while self: suggesting logout")
            return "logout"
        }
        
        return "Failed getting user"
    }
}