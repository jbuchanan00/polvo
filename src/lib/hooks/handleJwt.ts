import { getUserById } from "$lib/db/queries/getUser/getUserById";
import { verifyToken } from "$lib/server/tokens/jwt";
import { type Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')
    if(token){
        const userJwt = await verifyToken(token)
        if(userJwt?.userId){
            const pool = await event.locals.db()
            
            pool.release()
        }
    }
    

    return resolve(event)
}