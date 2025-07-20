import { getUserById } from "$lib/db/queries/getUser/getUserById";
import { verifyToken } from "$lib/server/tokens/jwt";
import { type Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')
    if(token){
        const userJwt = await verifyToken(token)
        console.log('HOOK JWT', userJwt)
        if(userJwt?.userId){
            
        }
    }
    

    return resolve(event)
}