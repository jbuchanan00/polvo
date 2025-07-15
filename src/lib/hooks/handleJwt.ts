import { getUserByJwt } from "$lib/server/db/user/getUserByJwt";
import { verifyToken } from "$lib/server/tokens/jwt";
import type { Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')
    
    if(token){
        const userJwt = await verifyToken(token)
        let user
        console.log(userJwt)
        if(userJwt?.userId){
            
            const pool = await event.locals.db()
            user = await getUserByJwt(pool, userJwt.userId as string)
            console.log('User', user)
        }
        if(user){
            event.locals.user = user
        }
    }

    return resolve(event)
}