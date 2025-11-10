import type { RequestHandler } from "@sveltejs/kit";
import dotenv from 'dotenv'

dotenv.config()

export const GET: RequestHandler = async ({url, fetch}) => {
    const text = url.searchParams.get("text")

    const res = await fetch(`${process.env.HALO_URL!}/autofill`, {
				method: "POST",
				body: JSON.stringify({
					location: text,
					baseLoc: {Id: 0, Name: "", State: "", Latitude: 44.58, Longitude: 103.46, Ranking: 6}
				})
			}).then(async res => {
                return await res.json()
            }).catch(err => {
                console.log('Error getting autofill, ', err)
            })

    return new Response(JSON.stringify(res))
}