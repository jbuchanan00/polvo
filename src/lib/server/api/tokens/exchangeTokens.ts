import dotenv from 'dotenv'
import { resolve } from '$app/paths'

dotenv.config()


export async function exchangeTokens(code: string, authCo: string): Promise<Response>{
    let body

    let client_id = authCo === "google" ? process.env.GOOGLE_CLIENT_ID! : process.env.INSTAGRAM_CLIENT_ID!
    let client_secret = authCo === "google" ? process.env.GOOGLE_CLIENT_SECRET! : process.env.META_SECRET!

    const redirect_uri = authCo === "google" ? `${process.env.OAUTH_REDIRECT_BASE}${resolve(`/auth/${authCo}/callback`)}` : `https://api.inked-out.com/auth/instagram/callback`
    
    body = new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code'
    })
    
    const url = authCo === "google" ? 'https://oauth2.googleapis.com/token' : 'https://api.instagram.com/oauth/access_token'
    
    const response = await fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body.toString()
    })

    
    if(!response.ok) {
        const error = await response.json()
        throw new Error(`Token exchange failed: ${error.error_description || error.error}`)
    };
    return response;
}