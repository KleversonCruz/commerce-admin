
export default class Role {
    #name: string

    constructor(nome: string) {
        this.#name = nome
    }

    get name() {
        return this.#name
    }

    toObject() {
        return{
            name: this.#name,
        }
    }


    static createObject(obj: Role): Role {
        return new Role(
            obj.name, 
        )
    }
}

