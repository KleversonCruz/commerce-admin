import Produtos from "./Produto"
import Categoria from "./Categoria"
import LojaConfig from "./LojaConfig"
import Cliente from "./Cliente"

export default class Loja {
    #id: number
    #cpfCnpj: string
    #nome: string
    #descricao: string
    #email: string
    #produtos: Produtos[]
    #categorias: Categoria[]
    #imageUrl: string
    #logoUrl: string
    #lojaConfig: LojaConfig
    #clientes: Cliente[]

    constructor(id: number, cpfCnpj: string, nome: string, descricao: string, email: string, categorias: Categoria[], produtos: Produtos[], imageUrl: string, logoUrl: string,
        lojaConfig: LojaConfig, clientes: Cliente[]) {
        this.#id = id
        this.#cpfCnpj = cpfCnpj
        this.#nome = nome
        this.#descricao = descricao
        this.#email = email
        this.#categorias = categorias
        this.#produtos = produtos
        this.#imageUrl = imageUrl
        this.#logoUrl = logoUrl
        this.#lojaConfig = lojaConfig
        this.#clientes = clientes
    }

    get id() {
        return this.#id
    }

    get cpfCnpj() {
        return this.#cpfCnpj
    }

    get nome() {
        return this.#nome
    }

    get descricao() {
        return this.#descricao
    }

    get email() {
        return this.#email
    }

    get produtos() {
        return this.#produtos
    }

    get categorias() {
        return this.#categorias
    }

    get imageUrl() {
        return this.#imageUrl
    }

    get logoUrl() {
        return this.#logoUrl
    }

    get lojaConfig() {
        return this.#lojaConfig
    }
    
    get clientes() {
        return this.#clientes
    }

    toObject() {
        return{
            id: this.#id,
            cpfCnpj: this.#cpfCnpj,
            nome: this.#nome,
            descricao: this.#descricao,
            email: this.#email,
            imageUrl: this.#imageUrl,
            logoUrl: this.#logoUrl,
            categorias: this.#categorias?.map(resp => resp.toObject()),
            produtos: this.#produtos?.map(resp => resp.toObject()),
            lojaConfig:  this.#lojaConfig,
            clientes: this.#clientes?.map(resp => resp.toObject()),
        }
    }

    static createObject(obj: Loja): Loja {
        return new Loja(
            obj.id,
            obj.cpfCnpj,
            obj.nome,
            obj.descricao,
            obj.email,
            obj.categorias,
            obj.produtos,
            obj.imageUrl,
            obj.logoUrl,
            obj.lojaConfig,
            obj.clientes,
        )
    }
}

