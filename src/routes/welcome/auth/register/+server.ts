import { hashAndSalt, prepCreateAuthProvider } from "$lib/server/api/authentication";
import { verifyUserExists } from "$lib/server/api/users";
import { createUser, upsertNativeAuth } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserById } from "$lib/db/queries/user/gets/getUserById";



export const POST: RequestHandler = async ({request, locals}) => {
    console.log("Starting Register for User")
    let i = +Date.now()
    const form = await request.json()
    const { username, email, password} = form as {
        username: string;
        email: string;
        password: string;
    };

    let user;

    if(password.length < 8){
        return new Response("Password is too short", {status: 400})
    }
    
    const crypted: HashAndSalt = await hashAndSalt(password)
    const pool = await locals.db()
    try{
        const userExists = await verifyUserExists(pool, email)
        console.log("Email Already exists: ", email)
        if(userExists){
            return new Response("Email already exists", {status: 400})
        }
        const user_id = await createUser(pool, {username, email})
        await upsertNativeAuth(pool, crypted, user_id)
        await prepCreateAuthProvider(pool, {userId: user_id, provider: 'native', email})
        user = await getUserById(pool, user_id)
        // pool.release()
        console.log("Successfully Registered User in:", +Date.now()-i)
        return new Response(JSON.stringify(user))
    }catch(e){
        console.log(`There was an error creating a user: ${JSON.stringify(e)}`)
        return new Response(`Error creating user ${e}`, {status: 400})
    }finally{
        pool.release()
    }
    
}