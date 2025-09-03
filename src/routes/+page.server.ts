import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./edit/$types";
import { base } from "$app/paths";

export const load: PageServerLoad = async ({locals}: {locals: any}) => {
    if(locals.user?.id){
        throw redirect(303, `${base}/${locals.user.id}`)
    }else {
        throw redirect(303, `${base}/welcome/auth`) 
    }
}

