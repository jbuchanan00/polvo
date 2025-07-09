import { getUserByJwt } from "$lib/server/db/user/getUserByJwt";
import { verifyToken } from "$lib/server/tokens/jwt";
import type { Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')
    
    if(token){
        const userJwt = await verifyToken(token)
        console.log('JWT', userJwt)
        let user
        if(userJwt?.userId){
            user = await getUserByJwt(event.locals.db, userJwt.userId as string)
            console.log('User', user)
        }
        if(user){
            event.locals.user = user
        }
    }

    return resolve(event)
}