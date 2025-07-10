import { redirect } from '@sveltejs/kit';
import { createUser } from '$lib/db/queries/createUser/users.js';
import { prepCreateAuthProvider } from '$lib/server/db/authentication/createAuthProvider.js';
import { hashAndSalt } from '$lib/server/db/authentication/hashAndSalt.js';
import type { RequestEvent } from './$types.js';
import { upsertNativeAuth } from '$lib/db/queries/createUser/upsertNativeAuth.js';

export const actions = {
	register: async ({ request, locals }: RequestEvent) => {
		const formData = await request.formData()
		const form = Object.fromEntries(formData);
		const action = formData.get("action")

		if(action === 'login'){
			throw redirect(303, '/welcome/login')
		}

		if(action === 'googleOAuth'){
			throw redirect(303, '/auth/google')
		}

		const { name, email, password, role: roleAsStr } = form as {
			name: string;
			email: string;
			password: string;
			role: string;
		};
		const role = parseInt(roleAsStr)
		const [givenName, familyName] = name.split(" ", 2)
		const crypted: HashAndSalt = await hashAndSalt(password)
		try{
			const user_id = await createUser(locals.db, {givenName, familyName, email, role})
			await upsertNativeAuth(locals.db, crypted, user_id)
			await prepCreateAuthProvider(locals.db, {userId: user_id, provider: 'native', email})
		}catch(e){
			console.log(`There was an error creating a user: ${e}`)
		}
		throw redirect(303, '/')
	}
};

