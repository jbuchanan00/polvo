import User from "../../lib/entities/user"
import { editExistingUser } from "$lib/server/api/users";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = ({locals}) => {

    return new Response()
}

export const POST: RequestHandler = async ({request, locals}) => {
        if(request === null) 
            return new Response("No request", {status: 400})
        const formData = await request.json()
        let location, role, roleId;
        let inputUser: User = User.empty
        try{
            inputUser.id = formData.user.id
            inputUser.username = formData.username
            inputUser.description = formData.description
            location = formData.location
            role = formData.role
            if(isNaN(role) && role){
                roleId = role.toLowerCase() === 'canvas' ? 1 : role.toLowerCase() === 'artist' ? 2 : 3;
            }
            if(formData.role_id){
                inputUser.roleId = formData.role_id
            }else{
                inputUser.roleId = roleId ?? 1;
            }
        }catch(e){
            console.log("There was an error parsing the form data", e)
            return new Response("Something went wrong parsing the form")
        }
        let submittedLocation: Location | string | null = null
        if(location !== '' && typeof location === 'string'){
            submittedLocation = JSON.parse(location)
        }
        inputUser.location = submittedLocation ?? location
        try {
            const pool = await locals.db()
            await editExistingUser(pool, inputUser)
            pool.release()
            return new Response(JSON.stringify(inputUser))
        }catch(e){
            console.error('FAILED TO EDIT EXISTING USER, ', e)
            return new Response("Error editing user " + e, {status: 500})
        }
}