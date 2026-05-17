import { getUsersBetweenLocations } from "$lib/db/queries/user/gets/getUsersBetweenLocations"
import { getUsersByLocations } from "$lib/db/queries/user/gets/getUsersByLocations"
import type { RequestHandler } from "@sveltejs/kit"


export const GET: RequestHandler = async ({url, locals}) => {
    console.log("Using Get to Get Locations for Users")
    let i = 0
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
        console.log("Successfully got Users in Locations in:", +Date.now()-i)
        return new Response(JSON.stringify(usersInLocations))
    }catch(e){
        console.log('Error getting users in locations:', e)
        pool.release()
        return new Response('Error in fetching')
    }finally{
        pool.release()
    }
}

//{coords: {maxLat: float, minLat: float, maxLong: float, minLong: float}}
export const POST: RequestHandler = async ({request, locals}) => {
    console.log("Using Post to Get Users in Locations")
    let i = +Date.now()
    const {coords} = await request.json();

    if(!coords){
        return new Response('No locations in url')
    }

    const pool = await locals.db()

    console.log('coords:', coords)

    try{
        let usersInLocations = await getUsersBetweenLocations(pool, {maxLat: coords.MaxLat, minLat: coords.MinLat}, {maxLong: coords.MaxLong, minLong: coords.MinLong})
        // pool.release()
        console.log("Successfully used Post to Get Users Between Locations in:", +Date.now()-i)
        return new Response(JSON.stringify(usersInLocations))
    }catch(e){
        console.log('Error getting users in locations:', e)
        // pool.release()
        return new Response('Error in fetching')
    }finally{
        pool.release()
    }
}