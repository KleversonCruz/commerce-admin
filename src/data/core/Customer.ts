import Address from "./Addresses"
import User from "./identity/User"

export default class Customer {
    #id: number
    #firstName: string
    #lastName: string
    #telephone: string
    #email: string
    #addresses: Address[]
    #user: User

    constructor(id: number, firstName: string, lastName: string, telephone: string, email: string, addresses: Address[], user: User) {
        this.#id = id
        this.#firstName = firstName
        this.#lastName = lastName
        this.#telephone = telephone
        this.#email = email
        this.#addresses = addresses
        this.#user = user
    }

    get id() {
        return this.#id
    }

    get firstName() {
        return this.#firstName
    }

    get lastName() {
        return this.#lastName
    }

    get telephone() {
        return this.#telephone
    }

    get email() {
        return this.#email
    }
    
    get addresses() {
        return this.#addresses
    }

    get user() {
        return this.#user
    }

    toObject() {
        return{
            id: this.#id,
            firstName: this.#firstName,
            lastName: this.#lastName,
            telephone: this.#telephone,
            email: this.#email,
            addresses: this.#addresses,
            user: this.#user,
        }
    }

    static createVoid() {
        return new Customer(
            0,
            '',
            '',
            '',
            '',
            [],
            null,
        )
    }

    static createObject(obj: Customer): Customer {
        return new Customer(
            obj.id, 
            obj.firstName, 
            obj.lastName, 
            obj.telephone,
            obj.email,
            obj.addresses,
            obj.user,
        )
    }
}

