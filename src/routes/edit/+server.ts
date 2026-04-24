import { editExistingUser } from "$lib/server/api/users";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = ({locals}) => {

    return new Response()
}

export const POST: RequestHandler = async ({request, locals}) => {
        const formData = await request.json()
        const form = Object.fromEntries(formData);
        let submittedLocation: Location | string = ''
        const {username, description, location, user, role} = form

        if(location !== '' && typeof location === 'string'){
            submittedLocation = JSON.parse(location)
        }

        
        user.username = username;
        user.description = description;
        user.location = submittedLocation;
        user.roleId = role;

        try {
            const pool = await locals.db()
            await editExistingUser(pool, user)
            pool.release()
            return new Response("Success")
        }catch(e){
            console.error('FAILED TO EDIT EXISTING USER, ', e)
            return new Response("Error editing user " + e, {status: 500})
        }
}