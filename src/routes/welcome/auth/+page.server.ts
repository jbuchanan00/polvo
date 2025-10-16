import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../../$types.js';
import { hashAndSalt, prepCreateAuthProvider, authenticateUser } from '$lib/server/api/authentication'
import { setCookieProperties } from '$lib/server/api/cookies'
import { createToken } from '$lib/server/api/tokens';
import { resolve } from '$app/paths';
import { verifyUserExists } from '$lib/server/api/users';
import {createUser, upsertNativeAuth, getUserByEmail} from '$lib/db/queries'


export const actions: Actions = {
    register: async ({ request, locals, cookies }) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        const { fullname, email, password, passwordConfirm } = form as {
            fullname: string;
            email: string;
            password: string;
            passwordConfirm: string;
        };

        if(password !== passwordConfirm){
            return fail(400, {error: "Passwords do not match"})
        }

        if(password.length < 8){
            return fail(400, {error: "Password is too short"})
        }
        
        const [givenName, familyName] = fullname.split(" ", 2)
        const crypted: HashAndSalt = await hashAndSalt(password)
        try{
            const pool = await locals.db()
            const userExists = await verifyUserExists(pool, email)
            if(userExists){
                return fail(400, {error: "Email already exists"})
            }
            const user_id = await createUser(pool, {givenName, familyName, email, role: 1})
            await upsertNativeAuth(pool, crypted, user_id)
            await prepCreateAuthProvider(pool, {userId: user_id, provider: 'native', email})
            pool.release()
            const token = await createToken({user_id})
            cookies.set('jwt', token, setCookieProperties())
        }catch(e){
            console.log(`There was an error creating a user: ${JSON.stringify(e)}`)
            throw redirect(303, resolve(`/welcome/auth?status=failed`))
        }
        throw redirect(303, resolve(`/welcome/auth?status=success`))
    },
    login: async ({request, locals, cookies}) => {
        const formData = await request.formData()
        const form = Object.fromEntries(formData);

        const { email, password } = form as {
            email: string;
            password: string;
        };

        try{
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
                console.log('Was not authenticated')
                throw redirect(303, resolve(`/welcome/auth?status=failed`))
            }
        }catch(e){
            console.log('Error trying to authenticate', e)
            throw redirect(303, resolve(`/welcome/auth?status=failed`))
        }
        throw redirect(303, resolve(`/welcome/auth?status=success`))
    }
}

export const load: PageServerLoad = async ({url, locals, request}: {url: any, locals: any, request: any}) => {
    const status = url.searchParams.get('status')
    const user = locals.user
    if(user?.id){
        throw redirect(301, resolve(`/`))
    }
    if(status === 'success'){
        return {status}
    }else{
        return {status: 'failed'}
    }

}
