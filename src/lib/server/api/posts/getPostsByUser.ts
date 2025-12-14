import dotenv from 'dotenv'

dotenv.config()

export const getPostsByUser = async (userId: string, page: number, pageSize: number): Promise<Post[]> => {
    try{
        const searchParams = new URLSearchParams()
        searchParams.append('userId', userId)
        searchParams.append('page', page.toString())
        searchParams.append('pageSize', pageSize.toString())
        const res = await fetch(`${process.env.NECTAR_URL!}/userposts?${searchParams}`)
        return await res.json()
    }catch(e){
        console.log('eRROR', e)
        return []
    }
    
}