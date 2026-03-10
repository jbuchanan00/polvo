import { insertMetaCall } from "$lib/db/queries";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({locals}) => {
    const data = 
        [
            {
            id: "18058398977452049"
            },
            {
            id: "18128433280467080"
            },
            {
            id: "17879955927400270"
            },
            {
            id: "18097080370589968"
            }
        ]
        
    

    const cursors = {
            before: "QVFIU3p4WUVuY2pfang5S3dJdFgxcDJiSzU2WmRPek81ZAjRlUGJvSUhvVlFRaDdwVzNkdjVULWNFVGxYZAXJPazlmc2RMODdGWG5lRUNFbDVfOTJTMVAwVC1B",
            after: "QVFIU1A3dkJFaFV4ZAlptSFRmMjUtNGRoQk4wZAWUyWFAyRGRNTXpiaVpwTm1Wanlxb2hHSEhYQkRyUkhTSE5XdDFmNVlRYkFkai1TTVlmZAVRCLV9NN3dWa2Vn"
            
        }
    const payload = {ids: data, cursors}

    const client = await locals.db()

    await insertMetaCall(client, payload, '11111111-1111-1111-1111-111111111111')

    return new Response()
}

