import { createUser } from '$lib/db/queries/index.js'
import { exchangeTokens } from '$lib/server/api/tokens'
import { prepCreateAuthProvider } from '$lib/server/api/authentication/createAuthProvider.js'
import { createToken } from '$lib/server/api/tokens/jwt.js'
import { retrieveUserIdBySub } from '$lib/server/api/authentication/getUserIdBySub.js'
import type { PoolClient } from 'pg'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { setCookieProperties } from '$lib/server/api/cookies'
import { resolve } from '$app/paths'
import { getUserById } from '$lib/db/queries/user/gets/getUserById'


export const GET: RequestHandler = async ({url, cookies, locals}): Promise<Response> => {
    const code = url.searchParams.get('code')


    if(!code){
        console.error('ERROR: no code')
        return new Response('No code', {status: 400})
    }

    let res
    try{
         res = await exchangeTokens(code, 'google')
    }catch(err){
        console.error('ERROR: exchanging tokens', err)
        return new Response('Failed to exchange tokens', {status: 500})
    }

    const json = await res.json()
    if(!json){
        console.error('ERROR: no json')
        return new Response('Failed to get json', {status: 500})
    }
    const payload = JSON.parse(
        Buffer.from(json.id_token.split('.')[1], 'base64').toString('utf8')
    );
    

    try {
        const pool: PoolClient = await locals.db()
        const {email, givenName, familyName, sub} = payload
        let userId = await retrieveUserIdBySub(pool, sub)
        let user;
        if(!userId){
            userId = await createUser(pool, {username: `${givenName}${familyName}`, email})
            await prepCreateAuthProvider(pool, {email, userId, provider: 'google', providerUserId: sub})
            user = await getUserById(pool, userId)
        }
        pool.release()
        const token = await createToken({user_id: userId})
        cookies.set('jwt', token, setCookieProperties())
        return new Response(JSON.stringify({user, token}))
    } catch(err) {
        console.error('ERROR: failure with queries', err)
        return new Response('Error creating user', {status: 500})
    }
}