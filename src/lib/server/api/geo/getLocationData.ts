

export async function getLocationData(coords: Coordinates): Promise<Location | null>{
    try{
        console.log('URL USED', (`${process.env.HALO_URL}/resolveCoordinates?latitude=${coords.latitude}&longitude=${coords.longitude}`))
        const res = await fetch(`${process.env.HALO_URL}/resolveCoordinates?latitude=${coords.latitude}&longitude=${coords.longitude}`)
        console.log('RESULT FROM LOCATION DATA', res)
        return await res.json()
    }catch(e){
        console.error("Error in the fetch", e)
        return null
    }
    
}