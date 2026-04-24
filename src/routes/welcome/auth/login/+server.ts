import { authenticateUser } from "$lib/server/api/authentication";
import { getUserByEmail } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit";
import { createToken } from "$lib/server/api/tokens";


export const POST: RequestHandler = async ({request, locals}) => {
    const form = await request.json()

    console.log('Login Form: ', form)

    const { email, password } = form as {
        email: string;
        password: string;
    };

    console.log("email", email, "password", password)

    try{
        const pool = await locals.db()

        const authenticated: boolean = await authenticateUser(pool, email, password)
        if(authenticated){
            const userResponse = await getUserByEmail(pool, email)
            console.log("User response:", userResponse)
            locals.user = userResponse
            pool.release()
            const token = await createToken({user_id: userResponse.id})
            return new Response(JSON.stringify({user: locals.user, token}))
        }else{
            pool.release()
            console.log('Was not authenticated')
            return new Response("Could not be authenticated", {status: 401})
        }
    }catch(e){
        console.log('Error trying to authenticate', e)
        return new Response("Error trying to authenticate", {status: 500})
    }
    
}