import type { PoolClient } from "pg";


export async function getShopById(db: PoolClient, id: string){
    const res = await db.query('SELECT * FROM shop WHERE id=$1', [id]).then(res => {
        return res.rows[0]
    })
    return res
}