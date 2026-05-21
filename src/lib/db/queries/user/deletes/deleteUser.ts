import type { PoolClient } from "pg";


export async function deleteUser(db: PoolClient, method: "email" | "id", identifier: string){
    const query = `DELETE FROM app_user WHERE $1 = $2`
    const res = await db.query(query, [method, identifier]).then(res => {
        console.log("Success deleting user", res)
        return 'ok'
    }).catch(err => {
        console.log("Error deleting user", err)
        return 'err'
    })
    return res
}