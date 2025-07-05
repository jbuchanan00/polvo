import exchangeTokens from '$lib/server/api/oauth/exchangeTokens.js'


export const GET = ({url, cookies}): Response => {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')


    if(!code){
        return new Response('Failed to complete Authorization', {status: 400})
    }

    exchangeTokens(code)

    return new Response('Callback reached', {status: 200})
}