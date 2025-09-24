import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = ({params, request}) => {
    const userId = params.slug

    return new Response()
}