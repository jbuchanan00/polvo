import type { PoolClient } from "pg";


export async function getUsersByIds(db: PoolClient, ids: string[]){
    let parameters = ''
    for(let i = 0; i < ids.length; i++){
        parameters += `$${i + 1}`
        if(i !== ids.length - 1){
            parameters += ', '
        }
    }
    return await db.query(`SELECT * FROM app_user WHERE id IN (${parameters})`, [...ids]).then(res => {
        return res.rows
    }).catch(err => {
        console.log("Error getting Users By Ids:", err)
        return []
    })
}