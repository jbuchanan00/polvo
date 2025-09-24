import { sequence } from '@sveltejs/kit/hooks';
import {withDb, handleJwt} from '$lib/hooks/index'

export const handle = sequence(withDb, handleJwt)