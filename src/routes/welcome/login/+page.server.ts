import { redirect, fail } from '@sveltejs/kit';
import { authenticateUser } from '$lib/server/authentication/authentication.js';
import { getUserByEmail } from '$lib/server/user/getUserByEmail.js';
import type { RequestEvent } from './$types.js';



export const actions = {
    default: async ({ request, locals }: RequestEvent) => {
        const formData = await request.formData()
		const form = Object.fromEntries(formData);
		const action = formData.get("action")

        if(action === 'register'){
            redirect(303, '/welcome/register')
        }

        const { email, password } = form as {
			email: string;
			password: string;
		};

        const authenticated: boolean = await authenticateUser(locals.db, email, password)

        const userResponse = await getUserByEmail(locals.db, email)

        locals.user = userResponse
        
        if(authenticated){
            redirect(303, '/')
        }else{
            console.log('Incorrect login')
            return fail(400, {email, message: 'Incorrect password'})
        }
    }
};