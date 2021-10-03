import Endereco from "./Endereco"
import User from "./identity/User"
import Loja from "./Loja"

export default class Cliente {
    #id: number
    #nome: string
    #sobrenome: string
    #telefone: string
    #email: string
    #enderecos: Endereco[]
    #pedidos: string
    #carrinhos: string
    #lojas: Loja[]
    #user: User

    constructor(id: number, nome: string, sobrenome: string, telefone: string, email: string, user: User,
        enderecos: Endereco[]) {
        this.#id = id
        this.#nome = nome
        this.#sobrenome = sobrenome
        this.#telefone = telefone
        this.#email = email
        this.#user = user
        this.#enderecos = enderecos
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get sobrenome() {
        return this.#sobrenome
    }

    get telefone() {
        return this.#telefone
    }

    get email() {
        return this.#email
    }
    
    get user() {
        return this.#user
    }

    get enderecos() {
        return this.#enderecos
    }

    toObject() {
        return{
            id: this.#id,
            nome: this.#nome,
            sobrenome: this.#sobrenome,
            telefone: this.#telefone,
            email: this.#email,
            user: this.#user,
            enderecos: this.#enderecos,
        }
    }

    static createVoid() {
        return new Cliente(
            0,
            '',
            '',
            '',
            '',
            null,
            [],
        )
    }

    static createObject(obj: Cliente): Cliente {
        return new Cliente(
            obj.id, 
            obj.nome, 
            obj.sobrenome, 
            obj.telefone,
            obj.email,
            obj.user,
            obj.enderecos,
        )
    }
}

