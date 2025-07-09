import { verifyToken } from "$lib/server/tokens/jwt";
import type { Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')

    if(token){
        const user = await verifyToken(token)
        if(user){
            event.locals.user = user
        }
    }

    return resolve(event)
}