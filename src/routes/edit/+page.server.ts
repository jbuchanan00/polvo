import type { RequestEvent } from './$types.js'
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