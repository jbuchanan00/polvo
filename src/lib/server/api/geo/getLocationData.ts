

export async function getLocationData(coords: Coordinates): Promise<Location | null>{
    try{
        const res = await fetch(`${process.env.HALO_URL}/resolveCoordinates?latitude=${coords.latitude}&longitude=${coords.longitude}`).then(async (res) => {
            let location = await res.json()
            if(location){
                location.coords = {latitude: location.latitude, longitude: location.longitude}
                delete location.latitude
                delete location.longitude
            }
            return location
        }).catch(e => console.log('Error', e))

        return res
    }catch(e){
        console.error("Error in the fetch for location data", e)
        return null
    }
    
}