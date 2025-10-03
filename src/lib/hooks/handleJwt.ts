import { verifyToken } from "$lib/server/api/tokens/jwt";
import { type Handle } from "@sveltejs/kit";



export const handleJwt: Handle = async ({event, resolve}) => {
    const token = event.cookies.get('jwt')
    if(token){
        const userJwt = await verifyToken(token)
        if(userJwt?.user_id){
            event.locals.user = {id: userJwt.user_id}
        }else{
            console.log("Could'nt find user_id on the token")
        }
    }else{
        console.log('No Token')
    }
    if(process.env.ENVIORNMENT === "dev" && !token){
        event.locals.user = {id: '11111111-1111-1111-1111-111111111111'}
    }
    

    return resolve(event)
}