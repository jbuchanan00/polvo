import { verifyToken } from "$lib/server/tokens/jwt";
import { type Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')
    console.log('ATTEMPTING TO RETRIEVE TOKEN', token)
    if(token){
        const userJwt = await verifyToken(token)
        if(userJwt?.user_id){
            event.locals.user = {id: userJwt.user_id}
            console.log('SET USER ID TOKEN')
        }
    }
    

    return resolve(event)
}