import User from "./identity/User"
import Loja from "./Loja"

export default class Endereco {
    #id: number
    #logradouro: string
    #numero: string
    #bairro: string
    #complemento: string
    #cidade: string
    #uf: string
    #cep: string

    constructor(id: number, logradouro: string, numero: string, bairro: string, complemento: string,
        cidade: string, uf: string, cep: string) {
        this.#id = id
        this.#logradouro = logradouro
        this.#numero = numero
        this.#bairro = bairro
        this.#complemento = complemento
        this.#cidade = cidade
        this.#uf = uf
        this.#cep = cep
    }

    get id() {
        return this.#id
    }

    get logradouro() {
        return this.#logradouro
    }

    get numero() {
        return this.#numero
    }

    get bairro() {
        return this.#bairro
    }

    get complemento() {
        return this.#complemento
    }

    get cidade() {
        return this.#cidade
    }
    get uf() {
        return this.#uf
    }
    get cep() {
        return this.#cep
    }

    toObject() {
        return {
            id: this.#id,
            nome: this.#logradouro,
            sobrenome: this.#numero,
            telefone: this.#bairro,
            email: this.#complemento,
            user: this.#cidade,
            uf: this.#uf,
            cep: this.#cep,
        }
    }

    static createVoid() {
        return new Endereco(
            0,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        )
    }

    static createObject(obj: Endereco): Endereco {
        return new Endereco(
            obj.id,
            obj.logradouro,
            obj.numero,
            obj.bairro,
            obj.complemento,
            obj.cidade,
            obj.uf,
            obj.cep,
        )
    }
}

