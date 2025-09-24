import { setCookieProperties } from "$lib/server/api/cookies";
import type { RequestHandler } from "@sveltejs/kit";


export const DELETE: RequestHandler = async ({locals, cookies}) => {
    if(locals.user){
        cookies.set('jwt', '', setCookieProperties(0))
    }

    return new Response('Logged Out')
}