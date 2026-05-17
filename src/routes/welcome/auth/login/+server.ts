import { authenticateUser } from "$lib/server/api/authentication";
import { getUserByEmail } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit"


export const POST: RequestHandler = async ({request, locals}) => {
    console.log("Performing Native Login")
    let i = +Date.now()
    const form = await request.json()

    console.log('Login Form: ', form)

    const { email, password } = form as {
        email: string;
        password: string;
    };

    console.log("email", email, "password", password)

    const pool = await locals.db()
    try{

        const authenticated: boolean = await authenticateUser(pool, email, password)
        
        if(authenticated){
            const userResponse = await getUserByEmail(pool, email)
            console.log("User response:", userResponse)
            locals.user = userResponse
            // pool.release()
            console.log("Authenticated", JSON.stringify(userResponse))
            console.log("Successfully Authenticated Native User in:", +Date.now()-i)
            return new Response(JSON.stringify({user: locals.user}))
        }else{
            // pool.release()
            console.log('Was not authenticated')
            console.log("Successfully Blocked Authentication in:", +Date.now()-i)
            return new Response("Could not be authenticated", {status: 401})
        }
    }catch(e){
        console.log('Error trying to authenticate', e)
        return new Response("Error trying to authenticate", {status: 500})
    }finally{
        pool.release()
    }
    
}