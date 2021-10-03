import Role from "./Role"

export default class User {
    #id: number
    #userName: string
    #lojaId: number
    #userRoles: Role[]

    constructor(id: number, userName: string, lojaId: number, userRoles: Role[]) {
        this.#id = id
        this.#userName = userName
        this.#lojaId = lojaId
        this.#userRoles = userRoles
    }

    get id() {
        return this.#id
    }

    get userName() {
        return this.#userName
    }

    get lojaId() {
        return this.#lojaId
    }

    get userRoles() {
        return this.#userRoles
    }
    
    static createObject(obj: User): User {
        return new User(
            obj.id, 
            obj.userName, 
            obj.lojaId,
            obj.userRoles,
        )
    }

    toObject() {
        return{
            id: this.#id,
            userName: this.#userName,
            lojaId: this.#lojaId,
            userRoles: this.#userRoles,
        }
    }
}