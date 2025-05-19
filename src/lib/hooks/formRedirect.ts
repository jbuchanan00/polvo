import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const formRedirect: Handle = async ({event, resolve}) => {
    const {url} = event
    const {method} = event.request

    const response = await resolve(event)
    return response;
}