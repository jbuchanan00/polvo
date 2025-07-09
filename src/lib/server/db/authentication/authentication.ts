import type { PoolClient } from "pg";
import { getSaltByUser } from "$lib/db/queries/getSalt";
import { hashAndSalt } from "./hashAndSalt";
import { getUserHashByEmail } from "$lib/db/queries/getUser/getUserHashByEmail";
import { verifyUserExistsByEmail } from "../../../db/queries/verifyUser";


export async function authenticateUser(db: PoolClient, email: string, password: string): Promise<boolean>{
    const exists = await verifyUserExistsByEmail(db, email)
    if(!exists) return false
    const salt = await getSaltByUser(db, email)
    const hashedPass = await hashAndSalt(password, salt)
    const orignalHashedPass = await getUserHashByEmail(db, email)

    return hashedPass.hash === orignalHashedPass
}