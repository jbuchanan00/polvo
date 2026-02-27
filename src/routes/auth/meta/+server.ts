import dotenv from 'dotenv'
import { redirect, type RequestHandler } from '@sveltejs/kit'
import { getRedis } from '$lib/server/redis'
import {randomBytes} from 'node:crypto'

dotenv.config()

export const GET: RequestHandler = async ({locals}) => {
    console.log("Environment:", process.env.ENVIRONMENT)
    let userId
    if(process.env.ENVIRONMENT === 'dev'){
        userId = '11111111-1111-1111-1111-111111111111'
    }else{
        userId = locals.user.id
    }
    console.log("Locals:", locals)
    const state = randomBytes(16).toString('hex')
    const r = getRedis()
    await r.set(`ig:state:${state}`, JSON.stringify({userId, state}), {EX: 600})

    return new Response(JSON.stringify({state}))
}