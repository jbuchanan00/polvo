import type { PoolClient } from "pg";


export async function isUserAuthed(db: PoolClient, userId: string, provider: string){
    const res = db.query(`SELECT * FROM auth_provider WHERE user_id=$1 and provider=$2`, [userId, provider]).then(res => {
        if(res.rowCount){
            return res.rowCount > 0
        }else{
            return res.rows.length > 0
        }
    }).catch(e => {
        console.log('Error getting authorization for instagram', e)
        return false
    })

    return res
}