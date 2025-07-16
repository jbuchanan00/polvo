import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad } from "./edit/$types";
import { getPostData } from "$lib/server/api/posts/getPostData.js";

export const load: PageServerLoad = async ({locals, cookies}: {locals: any, cookies: any}) => {
    let user;
    if(locals.user !== undefined){
        user = locals.user
    }else {
        throw redirect(303, '/welcome/auth') 
    }
    return {
        user
    }
}

