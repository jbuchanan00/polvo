import dotenv from 'dotenv'
import { base, resolve } from '$app/paths'

dotenv.config()


export default async function exchangeTokens(code: string, authCo: string): Promise<Response>{
    let body

    let client_id = authCo === "google" ? process.env.GOOGLE_CLIENT_ID! : process.env.META_CLIENT_ID!
    let client_secret = authCo === "google" ? process.env.GOOGLE_CLIENT_SECRET! : process.env.META_CLIENT_SECRET!
    
    body = new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri: `http://localhost:5173${resolve(`/auth/${authCo}/callback`)}`,
        grant_type: 'authorization_code'
    })
    
    const url = authCo === "google" ? 'https://oauth2.googleapis.com/token' : 'https://api.instagram/oauth/access_token'

    const response = await fetch(url, {
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