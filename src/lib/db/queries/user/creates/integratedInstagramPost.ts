import type { PoolClient } from "pg";



export async function insertIntegratedInstagramPost(db: PoolClient, userId: string, instagramPostIds: string[]){
    let query = "INSERT INTO integrated_instagram_post (user_id, id) VALUES "
    let i = 2
    instagramPostIds.forEach((id, index) => {
        query += `($1, $${i})`
        i++
        if(index < instagramPostIds.length - 1){
            query += ", "
        }
    })
    console.log("This is the query", query)
    return await db.query(query, [userId, ...instagramPostIds])
}