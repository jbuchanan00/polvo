import type { PoolClient } from "pg";


export async function deleteUser(db: PoolClient, method: "email" | "id", identifier: string){
    const query = `DELETE FROM app_user WHERE ${method} = $1`
    const res = await db.query(query, [identifier]).then(res => {
        console.log("Success deleting user", res)
        return 'ok'
    }).catch(err => {
        console.log("Error deleting user", err)
        return 'err'
    })
    return res
}