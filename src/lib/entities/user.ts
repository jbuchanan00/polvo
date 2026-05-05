

class User implements UserInterface{
    id: string
    firstName: string
    lastName: string
    username: string
    roleId: number
    location: Location | string | XYCoordinates
    shopName: string
    description: string


    constructor(id: string, firstName: string, lastName: string, username: string, roleId: number,
        location: string, shopName: string, description: string
    ){
        this.id = id,
        this.description = description,
        this.firstName = firstName,
        this.lastName = lastName,
        this.username = username,
        this.roleId = roleId,
        this.location = location,
        this.shopName = shopName,
        this.description = description    
    }


    static empty: User = {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        roleId: 0,
        location: "",
        shopName: "",
        description: ""
    }
}

export default User;