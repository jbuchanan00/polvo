import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import { createUser } from '$lib/db/queries/users.js';
import { hashAndSalt } from '$lib/server/authentication/hashAndSalt.js';
import type { RequestEvent } from './$types.js';

export const actions = {
	register: async ({ request, locals }: RequestEvent) => {
		const formData = await request.formData()
		const form = Object.fromEntries(formData);
		const action = formData.get("action")

		if(action === 'login'){
			throw redirect(303, '/welcome/login')
		}

		const { name, email, password, role } = form as {
			name: string;
			email: string;
			password: string;
			role: string;
		};
		const crypted: HashAndSalt = await hashAndSalt(password)
		try{
			await createUser(locals.db, {name, email, role}, crypted)
		}catch(e){
			console.log(`There was an error creating a user: ${e}`)
		}
		throw redirect(303, '/')
	}
};

