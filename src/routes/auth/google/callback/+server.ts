import { createUser } from '$lib/db/queries/index.js'
import exchangeTokens from '$lib/server/api/oauth/exchangeTokens.js'
import { prepCreateAuthProvider } from '$lib/server/db/authentication/createAuthProvider.js'
import { redirect } from '@sveltejs/kit'
import { createToken } from '$lib/server/tokens/jwt.js'
import dotenv from 'dotenv'
import { getUserByJwt } from '$lib/server/db/user/getUserByJwt.js'
import { retrieveUserIdBySub } from '$lib/server/db/authentication/getUserIdBySub.js'
import type { PoolClient } from 'pg'


export const GET = async ({url, cookies, locals}): Promise<void | Response> => {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')


    if(!code){
        return new Response('Failed to complete Authorization', {status: 400})
    }

    let res
    try{
         res = exchangeTokens(code, 'register')
    }catch(err){
        console.error('ERROR', err)
        return
    }

    const json = await (await res).json()
    const payload = JSON.parse(
        Buffer.from(json.id_token.split('.')[1], 'base64').toString('utf8')
    );
    console.log(payload)

    try {
        const pool: PoolClient = await locals.db()
        const {email, given_name: givenName, family_name: familyName, sub} = payload
        let userId = await retrieveUserIdBySub(pool, sub)
        if(!userId){
            userId = await createUser(pool, {givenName, familyName, email, role: 1})
            await prepCreateAuthProvider(pool, {email, userId, provider: 'google', providerUserId: sub})
        }
        const token = await createToken({userId})
        cookies.set('jwt', token, {
            httpOnly: true,
            secure: process.env.ENVIORNMENT === 'dev' ? false : true,
            sameSite: 'strict',
            maxAge: 3600 * 1000 * 24,
            path: '/',
            domain: 'localhost'
        })
        
    } catch(err) {
        console.error('ERROR', err)
    }
    
    throw redirect(301, '/')
}