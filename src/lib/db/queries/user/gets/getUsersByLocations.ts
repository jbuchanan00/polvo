import type { PoolClient } from "pg";


export async function getUsersByLocations(db: PoolClient, locs: {lat: number, lng: number}[]): Promise<{id: number}[]>{
    const latitudeList = locs.map(loc => {
        return loc.lat
    })
    const longitudeList = locs.map(loc => {
        return loc.lng
    })
    const query = await db.query('SELECT * FROM app_user WHERE location[0] IN $1 and location[1] IN $2', [latitudeList, longitudeList])
    console.log('Getting Users by locations', query)
    let userIds: {id: number}[] = []
    query.rows.map(user => {
        userIds.push({id: user.id})
    })
    return userIds
}