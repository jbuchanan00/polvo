import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../../$types.js';
import { hashAndSalt, prepCreateAuthProvider } from '$lib/server/db/authentication/index.js';
import { createUser } from '$lib/db/queries/index.js';
import { upsertNativeAuth } from '$lib/db/queries/createUser/upsertNativeAuth.js';
import { authenticateUser } from '$lib/server/db/authentication/authentication.js';
import { getUserByEmail } from '$lib/server/db/user/getUserByEmail.js';
import { createToken } from '$lib/server/tokens/jwt.js';


export const actions: Actions = {
    register: async ({ request, locals, cookies }) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        const { fullname, email, password } = form as {
            fullname: string;
            email: string;
            password: string;
        };
        
        const [givenName, familyName] = fullname.split(" ", 2)
        const crypted: HashAndSalt = await hashAndSalt(password)
        try{
            const pool = await locals.db()
            const user_id = await createUser(pool, {givenName, familyName, email, role: 1})
            await upsertNativeAuth(pool, crypted, user_id)
            await prepCreateAuthProvider(pool, {userId: user_id, provider: 'native', email})
            pool.release()
            const token = await createToken({user_id})
            cookies.set('jwt', token, {
                httpOnly: true,
                secure: process.env.ENVIORNMENT === 'dev' ? false : true,
                sameSite: 'strict',
                maxAge: 3600 * 1000 * 24,
                path: '/'
            })
            
        }catch(e){
            console.log(`There was an error creating a user: ${JSON.stringify(e)}`)
            return fail(400, {message: 'Error trying to register'})
        }
        throw redirect(303, '/')
    },
    login: async ({request, locals, cookies}) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        const { email, password } = form as {
            email: string;
            password: string;
        };

        const pool = await locals.db()

        const authenticated: boolean = await authenticateUser(pool, email, password)
        if(authenticated){
            const userResponse = await getUserByEmail(pool, email)

            locals.user = userResponse
            pool.release()
            const token = await createToken({userId: userResponse.id})
            cookies.set('jwt', token, {
                httpOnly: true,
                secure: process.env.ENVIORNMENT === 'dev' ? false : true,
                sameSite: 'strict',
                maxAge: 3600 * 1000 * 24,
                path: '/'
            })
            throw redirect(303, '/')
        }else{
            pool.release()
            console.log('Incorrect login')
            return fail(400, {email, message: 'Incorrect password'})
        }
    }
}