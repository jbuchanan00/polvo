import { updateUserProfileExtension } from "$lib/server/api/users";
import { getUsersProfilePictureExtension } from "$lib/server/api/users/getUsersProfilePictureExtensions";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({request, url, locals}) => {
    const data = url.searchParams.getAll('userId')
    if(!data){
        return new Response('No UserIds')
    }

    let extensions;

    const pool = await locals.db()
    try{
        extensions = await getUsersProfilePictureExtension(pool, data)
    }catch(e){
        console.log('Couldnt get extensions (ROUTE)', e)
        pool.release()
        return new Response("Couldn't get extensions", {status: 500})
    }
    
    pool.release()
    return new Response(JSON.stringify(extensions))
}

export const POST: RequestHandler = async ({request, locals}) => {
    const data = await request.json()
    const {extension, userid} = data
    if(!extension){
        return new Response("No extension", {status: 400})
    }
    const pool = await locals.db()
    updateUserProfileExtension(pool, userid, extension)

    return new Response("Updated extension")
}

export const PUT: RequestHandler = async () => {


    return new Response()
}

export const DELETE: RequestHandler = async() => {

    return new Response()
}