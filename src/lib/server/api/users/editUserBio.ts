import { editUser } from "$lib/db/queries";
import type User from "$lib/entities/user";
import type { PoolClient } from "pg";


export default async function editUserBio(db: PoolClient, user: User){
    try{
        await editUser(db, user)
    }catch(e){
        console.error('Error attempting to edit user bio', e)
    }
}