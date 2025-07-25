import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../../$types.js';
import { hashAndSalt, prepCreateAuthProvider } from '$lib/server/db/authentication/index.js';
import { createUser } from '$lib/db/queries/index.js';
import { upsertNativeAuth } from '$lib/db/queries/createUser/upsertNativeAuth.js';
import { authenticateUser } from '$lib/server/db/authentication/authentication.js';
import { getUserByEmail } from '$lib/server/db/user/getUserByEmail.js';
import { createToken } from '$lib/server/tokens/jwt.js';
import { setCookieProperties } from '$lib/server/api/cookies/setCookieProperties.js';


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
            cookies.set('jwt', token, setCookieProperties())
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
            const token = await createToken({user_id: userResponse.id})
            cookies.set('jwt', token, setCookieProperties())
        }else{
            pool.release()
            return fail(400, {email, message: 'Incorrect password'})
        }
        throw redirect(303, '/')
    }
}

export const load: PageServerLoad = async ({url, locals}: {url: any, locals: any}) => {
    const status = url.searchParams.get('status')
    const user = locals.user
    console.log('LOGGING USER IN AUTH', locals)
    if(user?.id){
        throw redirect(301, '/')
    }
    if(status === 'success'){
        return {status}
    }else{
        return {status: 'failed'}
    }

}
