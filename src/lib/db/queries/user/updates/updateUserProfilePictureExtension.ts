import type { PoolClient } from "pg";


export async function updateUserProfilePictureExtension(db: PoolClient, userId: string, extension: string){
    try {
        await db.query('BEGIN')
        const queryText = 'UPDATE app_user SET avatar_extension = $1 WHERE id = $2'
        await db.query(queryText, [extension, userId])
        await db.query('COMMIT')
    }catch(e){
        await db.query('ROLLBACK')
        console.log('Error updating user profile picture extension')
        return false
    }
    return true
}