import type { PoolClient } from "pg";


export async function deleteUser(db: PoolClient, method: "email" | "id", identifier: string){
    let query = ''
    if(method == "id"){
        query = `DELETE FROM app_user WHERE id = $1`
    }else if(method == "email"){
        query = "DELETE FROM app_user WHERE email = $1"
    }else{
        throw new Error("No correct method")
    }
    const res = await db.query(query, [identifier]).then(res => {
        console.log("Success deleting user", res)
        return 'ok'
    }).catch(err => {
        console.log("Error deleting user", err)
        return 'err'
    })
    return res
}