import type { PoolClient } from "pg";


export async function getShopsNamePagination(db: PoolClient, limit: number = 100, greaterThanName = ''){
    const res = await db.query("SELECT * FROM shop WHERE name > $1 LIMIT $2", [greaterThanName, limit])
        .then(res => {
            return res.rows
        })

    return res
}