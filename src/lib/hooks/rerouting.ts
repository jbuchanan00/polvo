import type { Handle } from '@sveltejs/kit';

export const reroute: Handle = async ({ event, resolve }): Promise<Response> => {
    const result = await resolve(event)
    return result
};