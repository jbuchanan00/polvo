import { sequence } from '@sveltejs/kit/hooks';
import {withDb, reroute, formRedirect, handleJwt} from '$lib/hooks/index'

export const handle = sequence(withDb, handleJwt)