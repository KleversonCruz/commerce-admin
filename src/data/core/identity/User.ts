import Role from "./Role"

export default class User {
    #id: number
    #userName: string
    #shopId: number
    #userRoles: Role[]

    constructor(id: number, userName: string, shopId: number, userRoles: Role[]) {
        this.#id = id
        this.#userName = userName
        this.#shopId = shopId
        this.#userRoles = userRoles
    }

    get id() {
        return this.#id
    }

    get userName() {
        return this.#userName
    }

    get shopId() {
        return this.#shopId
    }

    get userRoles() {
        return this.#userRoles
    }
    
    static createObject(obj: User): User {
        return new User(
            obj.id, 
            obj.userName, 
            obj.shopId,
            obj.userRoles,
        )
    }

    toObject() {
        return{
            id: this.#id,
            userName: this.#userName,
            shopId: this.#shopId,
            userRoles: this.#userRoles,
        }
    }
}