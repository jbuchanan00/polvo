import type { PoolClient } from "pg";


export async function getUsersBetweenLocations(db: PoolClient, lats: {minLat: number, maxLat: number}, longs: {minLong: number, maxLong: number}): Promise<{id: string}[]>{
    const query = "SELECT * FROM app_user WHERE (location[0] BETWEEN $1 AND $2) AND (location[1] BETWEEN $3 AND $4)"

    return await db.query(query, [lats.minLat, lats.maxLat, longs.minLong, longs.maxLong]).then(res => {
        return res.rows
    }).catch(err => {
        console.log("Error getting between locations:", err)
        return []
    })
}