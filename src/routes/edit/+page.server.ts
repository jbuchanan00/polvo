import type { RequestEvent, PageServerLoad } from './$types.js'
import { redirect } from '@sveltejs/kit'

export const actions = {
    submitEdit: async ({request, locals}: RequestEvent) => {
        const formData = await request.formData()
		const form = Object.fromEntries(formData);
		const action = formData.get("action")

        const originalUserData = locals.user

        
        throw redirect(303, '/')
    }
}

// export const load: PageServerLoad = async ({locals}) => {
//     return {user: {name: "Tommy", username: "TommyTats", role: 2, location: {latitude: 15, longitude: 15}}}
// }

export const load: PageServerLoad = async ({locals}: {locals: any}) => {
    let user;
    if(locals.user){
        user = locals.user
    }else {
        user = {name: "Tommy", username: "TommyTats", role: 2, location: {latitude: 15, longitude: 15}} 
    }
    return {
        user
    }
}