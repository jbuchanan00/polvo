import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../../$types.js';
import { hashAndSalt, prepCreateAuthProvider } from '$lib/server/db/authentication/index.js';
import { createUser } from '$lib/db/queries/index.js';
import { upsertNativeAuth } from '$lib/db/queries/createUser/upsertNativeAuth.js';
import { authenticateUser } from '$lib/server/db/authentication/authentication.js';
import { getUserByEmail } from '$lib/server/db/user/getUserByEmail.js';


export const actions: Actions = {
    register: async ({ request, locals }) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        const { name, email, password, role: roleAsStr } = form as {
            name: string;
            email: string;
            password: string;
            role: string;
        };
        const role = parseInt(roleAsStr)
        const [givenName, familyName] = name.split(" ", 2)
        const crypted: HashAndSalt = await hashAndSalt(password)
        try{
            const pool = await locals.db()
            const user_id = await createUser(pool, {givenName, familyName, email, role})
            await upsertNativeAuth(pool, crypted, user_id)
            await prepCreateAuthProvider(pool, {userId: user_id, provider: 'native', email})
        }catch(e){
            console.log(`There was an error creating a user: ${e}`)
        }
        throw redirect(303, '/')
    },
    login: async ({request, locals}) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        const { email, password } = form as {
            email: string;
            password: string;
        };

        const pool = await locals.db()

        const authenticated: boolean = await authenticateUser(pool, email, password)

        const userResponse = await getUserByEmail(pool, email)

        locals.user = userResponse
        
        if(authenticated){
            redirect(303, '/')
        }else{
            console.log('Incorrect login')
            return fail(400, {email, message: 'Incorrect password'})
        }
    }
}