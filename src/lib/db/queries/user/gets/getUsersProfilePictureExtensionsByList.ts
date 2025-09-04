import type { PoolClient } from "pg";


export async function getUsersProfilePictureExtensionByList(db: PoolClient, userIds: string){
    const res = await db.query(`SELECT avatar_extension, id FROM app_user WHERE id in ($1)`, [userIds]).then((res) => {
        return res.rows
    })

    return res
}