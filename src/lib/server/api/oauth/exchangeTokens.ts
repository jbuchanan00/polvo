import dotenv from 'dotenv'


dotenv.config()


export default async function exchangeTokens(code: string): Promise<void>{

    const body = new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: 'http://localhost:5433/auth/google/callback',
        grant_type: 'authorization_code'
    })

    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body
    })

    if(!response.ok) throw new Error(`Token exchange failed, ${response.status}`)
    return response.json();
}