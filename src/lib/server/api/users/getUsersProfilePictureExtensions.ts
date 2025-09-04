import { getUsersProfilePictureExtensionByList } from "$lib/db/queries";
import type { PoolClient } from "pg";


export async function getUsersProfilePictureExtension(db: PoolClient, userIds: string[]){
    let userIdsString = ""
    for(let i = 0; i < userIds.length; i++){
        userIdsString +=  userIds[i]
        if(i < userIds.length - 1){
            userIdsString += ","
        }
    }
    const rows = await getUsersProfilePictureExtensionByList(db, userIdsString)
    const hashed = new Map()
    rows.forEach((ele) => {
        hashed.set(ele.id, ele.avatar_extension)
    })
    return hashed
}