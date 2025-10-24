import type { PoolClient } from "pg";


export async function editUser(db: PoolClient, userWId: User){
    let setClauses = []
    const {id, ...user} = userWId
    for(const key in user){
        if(user[key] !== ''){
            if(key === 'location'){
                if(user[key] != null){
                    console.log('Location Lat', typeof user[key])
                    if(user[key]?.coords !== undefined){
                        setClauses.push(`location=point(${parseFloat(user[key].coords.latitude)}, ${parseFloat(user[key].coords.longitude)})`)
                    }else{
                        setClauses.push(`location=point(${parseFloat(user[key].latitude)}, ${parseFloat(user[key].longitude)})`)
                    }
                }
            }else{
                setClauses.push(`${key}='${user[key]}'`)
            }
        }
    }
    const setStr = setClauses.join(', ')
    try{
        await db.query('BEGIN')
        const queryText = `UPDATE app_user 
            SET
            ${setStr}
            WHERE id='${id}'`
        await db.query(queryText)
        await db.query('COMMIT')
    }catch(e){
        await db.query('ROLLBACK')
        throw e
    }

}