import { hashAndSalt, prepCreateAuthProvider } from "$lib/server/api/authentication";
import { verifyUserExists } from "$lib/server/api/users";
import { createUser, upsertNativeAuth } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserById } from "$lib/db/queries/user/gets/getUserById";



export const POST: RequestHandler = async ({request, locals}) => {
    const {form} = await request.json()
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
    try{
        const pool = await locals.db()
        const userExists = await verifyUserExists(pool, email)
        if(userExists){
            return new Response("Email already exists", {status: 400})
        }
        const user_id = await createUser(pool, {username, email})
        await upsertNativeAuth(pool, crypted, user_id)
        await prepCreateAuthProvider(pool, {userId: user_id, provider: 'native', email})
        user = await getUserById(pool, user_id)
        pool.release()
    }catch(e){
        console.log(`There was an error creating a user: ${JSON.stringify(e)}`)
        return new Response(`Error creating user ${e}`, {status: 400})
    }
    return new Response(JSON.stringify(user))
}