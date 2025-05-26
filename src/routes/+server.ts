import type { RequestHandler } from "./$types"
import { getPostData } from "$lib/server/api/posts/getPostData"

export const GET: RequestHandler = async ({url}) => {
    const id: string | number | null = url.searchParams.get('id')

    let res

    try{
        /* @ts-ignore */
        res = await getPostData(id)
    }catch(e){
        console.error(`ERROR GETTING POST ${e}`)
    }

    console.log('GET POST', res)
    return new Response(JSON.stringify(res), {
        headers: {'Content-Type': 'application/json'}
    })
}