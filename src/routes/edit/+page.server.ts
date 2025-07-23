import type { RequestEvent, PageServerLoad } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { editExistingUser } from '$lib/server/api/users/editExistingUser.js'

export const actions = {
    submitEdit: async ({request, locals}: RequestEvent) => {
        const formData = await request.formData()
		const form = Object.fromEntries(formData);

        const {username, first_name, last_name, location} = form

        locals.user = {
            firstName: first_name,
            lastName: last_name,
            username,
            location,
            ...locals.user
        }

        try {
            const pool = await locals.db()
            await editExistingUser(pool, locals.user)
        }catch(e){
            console.error('FAILED TO EDIT EXISTING USER, ', e)
        }

        console.log('form', form)
        throw redirect(303, `/${locals.user.id}`)
    }
}


export const load: PageServerLoad = async ({locals}: {locals: any}) => {
    let user;
    if(locals.user){
        user = locals.user
    }else {
        throw redirect(303, '/welcome/auth')
    }
    return {
        user
    }
}