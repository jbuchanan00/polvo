import type { PoolClient } from "pg";


export async function editUser(db: PoolClient, user: User){
    try{
        await db.query('BEGIN')
        const queryText = `UPDATE app_user 
            SET first_name=${user.firstName}, 
            last_name=${user.lastName}, 
            username=${user.username}, 
            location=(${user.location?.coords.latitude},${user.location?.coords.longitude})
            WHERE id=${user.id}`
        await db.query(queryText)
        await db.query('COMMIT')
    }catch(e){
        await db.query('ROLLBACK')
        throw e
    }

}