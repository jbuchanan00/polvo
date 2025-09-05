import type { RequestEvent, PageServerLoad } from './$types.js'
import { redirect } from '@sveltejs/kit'
import { editExistingUser } from '$lib/server/api/users/editExistingUser.js'
import { getUserById } from '$lib/db/queries/user/gets/getUserById.js'
import { resolve } from '$app/paths'

export const actions = {
    submitEdit: async ({request, locals}: RequestEvent) => {
        const formData = await request.formData()
		const form = Object.fromEntries(formData);
        let submittedLocation: Location | string = ''
        const {username, first_name, last_name, location} = form
        console.log('Edit form', form)

        if(location !== ''){
            submittedLocation = JSON.parse(location as string)
        }

        console.log('Submitted Location', submittedLocation)

        locals.user = {
            firstName: first_name,
            lastName: last_name,
            username,
            location: submittedLocation,
            ...locals.user
        }

        console.log('Locals', locals.user)

        try {
            const pool = await locals.db()
            await editExistingUser(pool, locals.user)
        }catch(e){
            console.error('FAILED TO EDIT EXISTING USER, ', e)
        }

        throw redirect(303, `${resolve(`/${locals.user.id}`)}`)
    }
}


export const load: PageServerLoad = async ({locals, fetch}: {locals: any, fetch: any}) => {
    let user;
    let profilePicture
    let pictureExt
    if(locals.user){
        const pool = await locals.db()
        user = await getUserById(pool, locals.user.id)
        try{
            let data = await fetch(`${resolve(`/avatar?userId=${locals.user.id}`)}`)
            data = await data.json()
            
            profilePicture = data.profilePictures[0]
            let datamap = new Map(Object.entries(data.extensions))
            pictureExt = datamap.get(locals.user.id)
        }catch(e){
            console.log('Error pulling picture', e)
        }
    }else {
        throw redirect(303, `${resolve('/welcome/auth')}`)
    }
    return {
        user,
        profilePicture,
        pictureExt
    }
}