import { getUsersByLocations } from "$lib/db/queries/user/gets/getUsersByLocations"
import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = async ({url, fetch, locals}) => {
    const locations = url.searchParams.getAll('loc')

    if(!locations){
        return new Response('No locations in url')
    }

    console.log('locations:', locations)

    const pool = await locals.db()

    try{
        // let usersInLocations = await getUsersByLocations(pool, locations)
    }catch(e){

    }

    return new Response()
}

export const POST = () => {

}