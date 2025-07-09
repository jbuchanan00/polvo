import type { RequestHandler } from "./$types"
import { getPostData } from "$lib/server/api/posts/getPostData"

export const GET: RequestHandler = async ({url}) => {
    const id: string | number | null = url.searchParams.get('id')

    if(!id){
        return new Response('No Id in search params', {status: 400})
    }

    let res: object

    try{  
        res = await getPostData(id)
    }catch(e){
        console.error(`ERROR GETTING POST ${e}`)
        return new Response('Error retrieving post data', {status: 500})
    }

    
    return new Response(JSON.stringify(res), {
        headers: {'Content-Type': 'application/json'}
    })
}