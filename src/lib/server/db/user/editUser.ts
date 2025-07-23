import type { PoolClient } from "pg";


export async function editUser(db: PoolClient, userWId: User){
    let setClauses = []
    const {id, ...user} = userWId
    for(const key in user){
        if(user[key] !== ''){
            if(key === 'location'){
                if(user[key] != null){
                    setClauses.push(`${location}=(${user[key].coords.latitude}, ${user[key].coords.longitude}`)
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
        console.log('QUERY TEXT', queryText)
        await db.query(queryText)
        await db.query('COMMIT')
    }catch(e){
        await db.query('ROLLBACK')
        throw e
    }

}