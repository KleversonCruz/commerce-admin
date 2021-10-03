
export default class Role {
    #nome: string

    constructor(nome: string) {
        this.#nome = nome
    }

    get nome() {
        return this.#nome
    }

    toObject() {
        return{
            nome: this.#nome,
        }
    }


    static createObject(obj: Role): Role {
        return new Role(
            obj.nome, 
        )
    }
}

