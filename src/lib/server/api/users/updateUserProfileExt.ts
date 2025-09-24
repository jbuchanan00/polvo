import type { PoolClient } from "pg";
import { updateUserProfilePictureExtension } from "$lib/db/queries";


export async function updateUserProfileExtension(db: PoolClient, userId: string, extension: string){
    return await updateUserProfilePictureExtension(db, userId, extension)
}