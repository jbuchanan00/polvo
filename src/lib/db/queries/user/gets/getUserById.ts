import type { PoolClient } from "pg";


export async function getUserById(db: PoolClient, id: string): Promise<FrontEndUser> {
    const res = await db.query(`SELECT app_user.*, shop.name, shop.location as shopLocation FROM app_user LEFT JOIN shop ON app_user.shop_id = shop.id WHERE app_user.id = $1`, [id]).then((res) => {
        if(!res.rows[0]){
            console.log('Error getting user by id')
            throw new Error("No User")
        }
        if(res.rows[0].location?.x && res.rows[0].location?.y){
            const locationCoords = {latitude: res.rows[0].location.x, longitude: res.rows[0].location.y}
            res.rows[0].location = {coords: locationCoords}
        }
        return res.rows[0]
    }).catch(e => console.log('Caught failing query for getting user', e))
    return res
}