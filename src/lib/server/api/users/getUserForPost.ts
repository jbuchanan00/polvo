import { getUserById } from "$lib/db/queries/user/gets/getUserById";
import type { PoolClient } from "pg";


export async function getUserForPost(db: PoolClient, userId: string){
    const user = await getUserById(db, userId)
    
    const username = user.username ?? user.first_name + ' ' + user.last_name
    const {shop_name, location} = user
    return {username, shop_name, location}
}