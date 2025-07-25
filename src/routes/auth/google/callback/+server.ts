import { createUser } from '$lib/db/queries/index.js'
import exchangeTokens from '$lib/server/api/oauth/exchangeTokens.js'
import { prepCreateAuthProvider } from '$lib/server/db/authentication/createAuthProvider.js'
import { createToken } from '$lib/server/tokens/jwt.js'
import { retrieveUserIdBySub } from '$lib/server/db/authentication/getUserIdBySub.js'
import type { PoolClient } from 'pg'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { setCookieProperties } from '$lib/server/api/cookies'
import { base } from '$app/paths'


export const GET: RequestHandler = async ({url, cookies, locals}): Promise<Response> => {
    const code = url.searchParams.get('code')


    if(!code){
        throw redirect(303, `${base}/welcome/auth?status=fail`)
    }

    let res
    try{
         res = exchangeTokens(code, 'register')
    }catch(err){
        console.error('ERROR', err)
        throw redirect(303, `${base}/welcome/auth?status=fail`)
    }

    const json = await res.then(async res => {
        return await res.json()
    })
    if(!json){
        throw redirect(303, `${base}/welcome/auth?status=fail`)
    }
    const payload = JSON.parse(
        Buffer.from(json.id_token.split('.')[1], 'base64').toString('utf8')
    );
    

    try {
        const pool: PoolClient = await locals.db()
        const {email, given_name: givenName, family_name: familyName, sub} = payload
        let userId = await retrieveUserIdBySub(pool, sub)
        if(!userId){
            userId = await createUser(pool, {givenName, familyName, email, role: 1})
            await prepCreateAuthProvider(pool, {email, userId, provider: 'google', providerUserId: sub})
        }
        pool.release()
        const token = await createToken({user_id: userId})
        cookies.set('jwt', token, setCookieProperties())
        
    } catch(err) {
        console.error('ERROR', err)
        throw redirect(303, `${base}/welcome/auth?status=fail`)
    }
    throw redirect(303, `${base}/welcome/auth?status=success`)
}