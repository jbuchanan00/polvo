import { sequence } from '@sveltejs/kit/hooks';
import {withDb, reroute, formRedirect} from '$lib/hooks/index'

export const handle = sequence(withDb, reroute, formRedirect)