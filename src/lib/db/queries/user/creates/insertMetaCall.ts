import type { PoolClient } from "pg";


export async function insertMetaCall(db: PoolClient, payload: {ids: {id: string}[], cursors: {before: string, after: string}}, userId: string){
    const callId = crypto.randomUUID()
    try{
        await db.query('BEGIN')
        
        const query = `INSERT INTO meta_media_call (id, user_id, before_cursor, after_cursor) VALUES 
            ($1, $2, $3, $4)`

        await db.query(query, [callId, userId, payload.cursors.before, payload.cursors.after])

        let valuesList: string[] = []
        payload.ids.map(id => {
            valuesList.push(id.id)
            valuesList.push(callId)
        })

        let valuesParameterazation = ''
        const {ids} = payload
        for(let i = 0; i < ids.length; i++){
            valuesParameterazation += ` ($${i*2+1}, $${i*2+2})`
            if(i != ids.length - 1){
                valuesParameterazation += ','
            }
        }

        const idsQuery = `INSERT INTO meta_media_result (id, call_id) VALUES
            ${valuesParameterazation}`

        console.log('String:', valuesParameterazation, '\nValues:', valuesList)

        await db.query(idsQuery, [...valuesList])

        await db.query('COMMIT')
    }catch(e){
        await db.query("ROLLBACK")
        console.log('Error occured adding meta calls:', e)
    }
}