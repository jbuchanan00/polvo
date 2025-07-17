import type { RequestEvent, PageServerLoad } from './$types.js'
import { redirect } from '@sveltejs/kit'

export const actions = {
    submitEdit: async ({request, locals}: RequestEvent) => {
        const formData = await request.formData()
		const form = Object.fromEntries(formData);
		const action = formData.get("action")

        const originalUserData = locals.user

        console.log('form', form)
        throw redirect(303, '/')
    }
}


export const load: PageServerLoad = async ({locals}: {locals: any}) => {
    let user;
    if(locals.user){
        user = locals.user
    }else {
        throw redirect(303, '/auth/welcome')
    }
    return {
        user
    }
}