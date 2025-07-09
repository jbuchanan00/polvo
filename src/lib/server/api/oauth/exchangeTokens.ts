import dotenv from 'dotenv'
import { json } from '@sveltejs/kit'

dotenv.config()


export default async function exchangeTokens(code: string, mode: string): Promise<Response>{
    let body

    if(mode === 'register'){
        body = new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: 'http://localhost:5173/auth/google/callback/register',
            grant_type: 'authorization_code'
        })
    }else if(mode === 'login'){
        body = new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: 'http://localhost:5173/auth/google/callback/login',
            grant_type: 'authorization_code'
        })
    }else{
        throw new Error('Error with mode type')
    }
    

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body
    })

    
    if(!response.ok) {
        const error = await response.json()
        throw new Error(`Token exchange failed: ${error.error_description || error.error}`)
    };
    return response;
}