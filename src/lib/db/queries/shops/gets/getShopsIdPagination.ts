import type { PoolClient } from "pg";


export async function getShopsIdPagination(db: PoolClient, limit: number = 100, greaterThanId: string = '0'){
    const res = await db.query('SELECT * FROM shop WHERE id > $1 LIMIT $2', [greaterThanId, limit])
        .then(res => {
            return res.rows
    })
    return res
}