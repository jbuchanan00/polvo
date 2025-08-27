import type { PoolClient } from "pg";


export async function insertShop(db: PoolClient, id: string, name: string, location: Location){
    const res = await db.query(`INSERT INTO shop (id, name, location) VALUES ($1, $2, ($3)) RETURNING id`, 
        [id, name, `${location.coords.latitude}, ${location.coords.longitude}`]).then(res => {
            return res.rows[0].id
        }).catch(err => {
            console.log('ERROR INSERTING SHOP', err)
        })
    return res ?? 'failed'
}