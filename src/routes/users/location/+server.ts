import { getUsersByLocations } from "$lib/db/queries/user/gets/getUsersByLocations"
import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = async ({url, fetch, locals}) => {
    const locations = url.searchParams.getAll('loc')

    if(!locations || locations.length < 1){
        return new Response('No locations in url')
    }

    const formattedLocations = locations.map(loc => {
        const arr = loc.split(',')
        return {lat: parseFloat(arr[0]), lng: parseFloat(arr[1])}
    })

    const pool = await locals.db()

    console.log('locations:', formattedLocations)

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

//{locations: [{lat: float, lng: float}]}
export const POST: RequestHandler = async ({request, locals}) => {
    // const {locations} = await request.json()
    const req = await request.json();

    console.log('Post Request: ', req)

    const locations = req.locations;

    if(!locations || locations.length < 1){
        return new Response('No locations in url')
    }

    const pool = await locals.db()

    console.log('locations:', locations)

    try{
        let usersInLocations = await getUsersByLocations(pool, locations)
        pool.release()
        return new Response(JSON.stringify(usersInLocations))
    }catch(e){
        console.log('Error getting users in locations:', e)
        pool.release()
        return new Response('Error in fetching')
    }
}