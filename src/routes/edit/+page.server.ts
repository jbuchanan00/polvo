import type { RequestEvent, PageServerLoad } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { editExistingUser } from '$lib/server/api/users/editExistingUser.js'
import { getUserById } from '$lib/db/queries/user/gets/getUserById.js'
import { base } from '$app/paths'

export const actions = {
    submitEdit: async ({request, locals}: RequestEvent) => {
        const formData = await request.formData()
		const form = Object.fromEntries(formData);
        let submittedLocation: Location | string = ''
        const {username, first_name, last_name, location} = form

        if(location !== ''){
            submittedLocation = JSON.parse(location as string)
        }

        locals.user = {
            firstName: first_name,
            lastName: last_name,
            username,
            location: submittedLocation,
            ...locals.user
        }

        try {
            const pool = await locals.db()
            await editExistingUser(pool, locals.user)
        }catch(e){
            console.error('FAILED TO EDIT EXISTING USER, ', e)
        }

        throw redirect(303, `${base}/${locals.user.id}`)
    }
}


export const load: PageServerLoad = async ({locals}: {locals: any}) => {
    let user;
    if(locals.user){
        const pool = await locals.db()
        user = await getUserById(pool, locals.user.id)
    }else {
        throw redirect(303, `${base}/welcome/auth`)
    }
    return {
        user
    }
}