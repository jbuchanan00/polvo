import { insertMetaCall } from "$lib/db/queries";
import { insertIntegratedInstagramPost } from "$lib/db/queries/user/creates/integratedInstagramPost";
import { decrypt } from "$lib/server/api/helpers";
import { getLLTokenAndId } from "$lib/server/api/tokens";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ params, request, locals, url, fetch }) => {
    const userId = params.slug
    const apiKey = request.headers.get('x-api-key')
    const before = url.searchParams.get('before')
    console.log('Calling Instagram Posts')

    if (!userId) {
        return new Response('No User Id', { status: 400 })
    }

    try {
        const pool = await locals.db()
        console.log(await getLLTokenAndId(pool, userId, 'instagram'))
        const tokenRes = await getLLTokenAndId(pool, userId, 'instagram')
        if (!tokenRes) return new Response("Error with token")
        const { token, iv, provider_user_id: instaId, tag } = tokenRes
        pool.release()

        const accessToken = decrypt(token, iv, tag)

        const gettingPostsUrl = `${process.env.INSTAGRAM_GRAPH_BASE}/${instaId}/media?access_token=${accessToken}`

        const res = await fetch(gettingPostsUrl)

        if (!res.ok) {
            console.log('Error retrieving posts from instagram')
            return new Response('Error retrieving post ids', { status: 500 })
        }

        const { data, paging } = await res.json()
        const { cursors } = paging

        if (!data || !paging) {
            console.log('Error with getting data from response')
            return new Response(`Couldn't find the posts or paging data`, { status: 500 })
        }

        if (data.length < 1) {
            return new Response('No new posts discovered')
        }

        // let devUserId = ''

        // if(!locals.user.id && process.env.ENVIRONMENT === 'dev'){
        // devUserId = '11111111-1111-1111-1111-111111111111'
        // }

        try {
            await insertMetaCall(pool, { ids: data, cursors: { before: cursors.before, after: cursors.after } }, userId)
        } catch (e) {
            console.log("Error inserting meta api call:", e)
        }

        let idsToCall: Promise<Response>[] = []

        // await insertIntegratedInstagramPost(pool, userId, data)

        data.forEach((element: { id: string }) => {
            idsToCall.push(fetch(`${process.env.INSTAGRAM_GRAPH_BASE}/${element.id}` +
                `?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`))
        });

        const postsData = await Promise.all(idsToCall)

        const settled = await Promise.allSettled(postsData.map(r => r.json()));

        const ok = settled
            .filter((s): s is PromiseFulfilledResult<unknown> => s.status === "fulfilled")
            .map(s => s.value);
        console.log('Posts data: ', JSON.stringify(ok))
        return new Response(JSON.stringify({ posts: ok, cursor: paging.cursors.before }))

    } catch (e) {
        console.log('Error gathering instagram posts', e)
        return new Response("Error gathering media" + e, { status: 500 })
    }
}
//{data: [{id:""}, {id:""}]}
export const POST: RequestHandler = async ({ params, request, locals }) => {
    const userId = params.slug
    const { data } = await request.json()

    const unfoldedData = data.map((item: { id: string }) => { return item.id })
    if (!userId || userId == "") {
        return new Response("No userId", { status: 400 })
    }

    const pool = await locals.db()
    try {
        await insertIntegratedInstagramPost(pool, userId, unfoldedData)
        return new Response("Successfully added posts ids")
    } catch (e) {
        console.log("Issue inserting integrated instagram posts", e)
        return new Response(`${e}`, { status: 500 })
    } finally {
        pool.release()
    }
}