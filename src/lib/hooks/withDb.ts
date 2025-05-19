import type { Handle } from '@sveltejs/kit';
import { connectToDB } from '$lib/db/db';

export const withDb: Handle = async ({ event, resolve }): Promise<Response> => {
  const dbconn = await connectToDB();
  event.locals.db = dbconn;

    const response = await resolve(event);
    dbconn.release();
    return response;
};