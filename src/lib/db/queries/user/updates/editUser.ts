import type { PoolClient } from "pg";


export async function editUser(db: PoolClient, userWId: Record<string, any>){
    let setClauses = []
    const {id, ...user} = userWId
    console.log('Editing User:', id)
    let index = 1
    let paramVals = []
    for(const key in user){
        if(user[key] !== ''){
            if(key === 'location'){
                if(user[key] != null){
                    if(user[key]?.coords !== undefined){
                        setClauses.push(`location=point($${index}, $${index + 1})`)
                        index += 2
                        paramVals.push(parseFloat(user[key].coords.latitude))
                        paramVals.push(parseFloat(user[key].coords.longitude))
                    }else{
                        setClauses.push(`location=point($${index}, $${index + 1})`)
                        index += 2
                        paramVals.push(parseFloat(user[key].latitude))
                        paramVals.push(parseFloat(user[key].longitude))
                    }
                }
            }else{
                setClauses.push(`${key}=$${index}`)
                index += 1
                paramVals.push(user[key])
            }
        }
    }
    const setStr = setClauses.join(', ')
    try{
        await db.query('BEGIN')
        const queryText = `UPDATE app_user 
            SET
            ${setStr}
            WHERE id=$${index}
            RETURNING *`
            console.log(queryText, 'and,', paramVals)
        const res = await db.query(queryText, [...paramVals, id])
        console.log(res)
        await db.query('COMMIT')
    }catch(e){
        await db.query('ROLLBACK')
        throw e
    }

}