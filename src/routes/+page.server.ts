import type { RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad } from "./edit/$types";
import { getPostData } from "$lib/server/api/posts/getPostData.js";

export const load: PageServerLoad = async ({locals}: {locals: any}) => {
    let user;
    if(locals.user !== undefined){
        user = locals.user
    }else {
        user = {name: "Tommy", username: "TommyTats", role: 2, location: {latitude: 15, longitude: 15}} 
    }
    return {
        user
    }
}

export const GET: RequestHandler = async ({request}) => {
    const { id } = await request.json()
    const res = getPostData(id)
    return new Response(JSON.stringify(res), {
        headers: {'Content-Type': 'application/json'}
    })
}