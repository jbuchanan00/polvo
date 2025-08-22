import type { PoolClient } from "pg";


export async function getUserById(db: PoolClient, id: string): Promise<FrontEndUser> {
    const res = await db.query(`SELECT * FROM app_user WHERE id = $1`, [id]).then((res) => {
        if(res.rows[0].location?.x && res.rows[0].location?.y){
            const locationCoords = {latitude: res.rows[0].location.x, longitude: res.rows[0].location.y}
            res.rows[0].location = {coords: locationCoords}
        }
        return res.rows[0]
    }).catch(e => console.log('Catched', e))
    return res
}