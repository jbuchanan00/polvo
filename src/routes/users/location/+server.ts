import { getUsersByLocations } from "$lib/db/queries/user/gets/getUsersByLocations"
import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = async ({url, fetch, locals}) => {
    const locations = url.searchParams.getAll('loc')

    if(!locations || locations.length < 1){
        return new Response('No locations in url')
    }

    console.log('locations:', locations)

    const formattedLocations = locations.map(loc => {
        const arr = loc.split(',')
        return {lat: parseInt(arr[0]), lng: parseInt(arr[1])}
    })

    const pool = await locals.db()

    try{
        let usersInLocations = await getUsersByLocations(pool, formattedLocations)
        pool.release()
        return new Response(JSON.stringify(usersInLocations))
    }catch(e){
        console.log('Error getting users in locations:', e)
        pool.release()
        return new Response('Error in fetching')
    }
}

export const POST = () => {

}