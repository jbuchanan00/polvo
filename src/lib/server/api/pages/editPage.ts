import { resolve } from "$app/paths";
import { getUserById } from "$lib/db/queries/user/gets/getUserById";
import type { PoolClient } from "pg";
import { getLocationData } from "../geo";


export async function setupEditPage(db: PoolClient, locals: {user: User}){
    let editPage = new EditDto()
    if(locals.user){
        editPage.user = await getUserById(db, locals.user.id)
        try{
            let data = await fetch(`${resolve(`/avatar?userId=${locals.user.id}`)}`)
            let extractedData = await data.json()
            if(editPage.user.location){
                editPage.user.location = await getLocationData(editPage.user.location.coords)
            }

            editPage.profilePicture = extractedData.profilePictures[0]
            let datamap = new Map(Object.entries(extractedData.extensions))
            editPage.pictureExt = datamap.get(locals.user.id) as string
        }catch(e){
            console.log('Error pulling picture', e)
        }
        return new Response(JSON.stringify(editPage))
    }else {
        return new Response("Error loading data", {status: 400})
    }
}