import exchangeTokens from '$lib/server/api/oauth/exchangeTokens.js'
import { redirect } from '@sveltejs/kit'


export const GET = async ({url, cookies}): Promise<void | Response> => {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')


    if(!code){
        return new Response('Failed to complete Authorization', {status: 400})
    }

    const res = exchangeTokens(code)

    const json = await (await res).json()
    const payload = JSON.parse(
        Buffer.from(json.id_token.split('.')[1], 'base64').toString('utf8')
    );
    console.log(payload)
    /**
     * When implementing your account management system, you shouldn't use the email field in the ID token as a 
     * unique identifier for a user. Always use the sub field as it is unique to a Google Account even if the 
     * user changes their email address.
     */
    throw redirect(301, '/')
}