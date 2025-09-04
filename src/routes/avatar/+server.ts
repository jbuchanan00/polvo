import { updateUserProfileExtension } from "$lib/server/api/users";
import { getUsersProfilePictureExtension } from "$lib/server/api/users/getUsersProfilePictureExtensions";
import type { RequestHandler } from "@sveltejs/kit";
import { mkdir, writeFile, readFileSync } from 'fs'
import path from "path";

const BASE_PATH = '/data/avatars/'

export const GET: RequestHandler = async ({request, url, locals}) => {
    const data = url.searchParams.getAll('userId')
    if(!data){
        return new Response('No UserIds')
    }

    const userIds = data
    let profilePictures: any[] = [];
    let extensions;

    const pool = await locals.db()
    try{
        extensions = await getUsersProfilePictureExtension(pool, data)
    }catch(e){
        console.log('Couldnt get extensions (ROUTE)', e)
        return new Response()
    }

    userIds.forEach((userId) => {
        const userExt = extensions.get(userId)
        const pic = readFileSync(`${BASE_PATH}${userId}/avatar.${userExt}`)
        profilePictures.push(Buffer.from(pic).toString('base64'))
    })

    return new Response(JSON.stringify({profilePictures, extensions: Object.fromEntries(extensions)}))
}

export const POST: RequestHandler = async ({request, locals}) => {
    const data = await request.json()

    if (data === null){
        return new Response("No data retrieved by Avatar Post", {status: 400})
    }

    let [mime, raw] = data.split(',', 2)
    let [imageType] = mime.split(';', 1)
    const extension = imageType.split('/')[1]

    mkdir(path.join(BASE_PATH, locals.user.id), { recursive: true }, (err) => {
        if(err){
            console.log('Error creating directory', err)
        }else{
            console.log('Directory successfuly created')
        }
    })

    const bytes = Buffer.from(raw, 'base64')

    writeFile(`${BASE_PATH}${locals.user.id}/avatar.${extension}`, bytes, async (err) => {
        if(err){
            console.log('Error saving image', err)
        }else{
            console.log('Image successfully saved')
            const pool = await locals.db()
            updateUserProfileExtension(pool, locals.user.id, extension)
        }
    })

    return new Response()
}

export const PUT: RequestHandler = async () => {


    return new Response()
}

export const DELETE: RequestHandler = async() => {

    return new Response()
}