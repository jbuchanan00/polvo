import { addMetaAuth } from "$lib/server/api/authentication/addMetaAuth";
import { connectToDB } from "$lib/db/db";
import { setLLToken } from "$lib/server/api/tokens";

const [, , userId, accessToken, instagramId] = process.argv;

(async function token(){
    console.log(userId, accessToken, instagramId)
    try{
        const pool = await connectToDB()
        // await addMetaAuth(pool, userId, instagramId)
        await setLLToken(pool, userId, accessToken)
        pool.release()
    }catch(e){
        console.log('Error', e)
    }
})()

