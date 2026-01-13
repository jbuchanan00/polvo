import type { PoolClient } from "pg";


export async function getUsersByLocations(db: PoolClient, locs: {lat: number, lng: number}[]): Promise<{id: number}[]>{
    let latStr = ""
    let latNum = 1
    const latitudeList = locs.map(loc => {
        latStr += "$" + latNum + ","
        latNum++
        return loc.lat
    })

    let lngStr = ""
    let lngNum = latNum
    const longitudeList = locs.map(loc => {
        lngStr += "$" + lngNum + ","
        lngNum++
        return loc.lng
    })
    console.log(`SELECT * FROM app_user WHERE location[0] IN (${latStr.slice(0, -1)}) and location[1] IN (${lngStr.slice(0, -1)})`)
    const query = await db.query(`SELECT * FROM app_user WHERE location[0] IN (${latStr.slice(0, -1)}) and location[1] IN (${lngStr.slice(0, -1)})`, [...latitudeList, ...longitudeList])
    
    let userIds: {id: number}[] = []
    query.rows.map(user => {
        userIds.push({id: user.id})
    })
    return userIds
}