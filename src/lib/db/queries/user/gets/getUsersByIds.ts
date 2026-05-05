import type User from "$lib/entities/user";
import type { PoolClient } from "pg";


export async function getUsersByIds(db: PoolClient, ids: string[]): Promise<User[]>{
    let parameters = ''
    for(let i = 0; i < ids.length; i++){
        parameters += `$${i + 1}`
        if(i !== ids.length - 1){
            parameters += ', '
        }
    }
    return await db.query(`SELECT * FROM app_user WHERE id IN (${parameters})`, [...ids]).then(res => {
           res.rows.forEach(row => {
               if(row.location?.x && res.rows[0].location?.y){
                   const locationCoords = {latitude: res.rows[0].location.x, longitude: res.rows[0].location.y}
                   res.rows[0].location = {coords: locationCoords}
               }
           }) 

        return res.rows
    }).catch(err => {
        console.log("Error getting Users By Ids:", err)
        return []
    })
}