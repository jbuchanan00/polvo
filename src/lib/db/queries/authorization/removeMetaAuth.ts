import type { PoolClient } from "pg";
import { getAuthProviderByProvidedId } from "./getAuthProvider";


export async function removeMetaAuth(db: PoolClient, id: string, idType: 'meta' | 'native') {
    let userId = ""
    if (idType == 'meta') {
        let provider = await getAuthProviderByProvidedId(db, id)
        userId = provider.userId
    } else {
        userId = id
    }

    const query = "DELETE FROM auth_provider WHERE user_id=$1 and (provider='meta' or provider='instagram'); DELETE FROM meta_lltokens WHERE user_id=$1;"

    return await db.query(query, [userId])
}