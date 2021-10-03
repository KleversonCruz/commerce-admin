import Loja from "./Loja"
import Produto from "./Produto"

export default class Categoria {
    #id: number
    #nome: string
    #descricao: string
    #produtos: Produto[]

    #lojaId: number
    #loja: Loja
    #imageUrl: string

    constructor(id: number, nome: string, descricao: string, produtos: Produto[], lojaId: number, loja: Loja, imageUrl: string, ) {
        this.#id = id
        this.#nome = nome
        this.#descricao = descricao
        this.#produtos = produtos
        this.#lojaId = lojaId
        this.#loja = loja
        this.#imageUrl = imageUrl
    }

    get id() {
        return this.#id
    }

    get nome() {
        return this.#nome
    }

    get descricao() {
        return this.#descricao
    }

    get produtos() {
        return this.#produtos
    }

    get lojaId() {
        return this.#lojaId
    }
    
    get loja() {
        return this.#loja
    }
    
    get imageUrl() {
        return this.#imageUrl
    }

    toObject() {
        return{
            id: this.#id,
            nome: this.#nome,
            descricao: this.#descricao,
            produtos: this.#produtos,
            lojaId: this.#lojaId,
            loja: this.#loja,
            imageUrl: this.#imageUrl,
        }
    }

    static createVoid() {
        return new Categoria(
            0,
            '',
            '',
            [],
            0,
            null,
            ''
        )
    }

    static createObject(obj: Categoria): Categoria {
        return new Categoria(
            obj.id, 
            obj.nome, 
            obj.descricao, 
            obj.produtos,
            obj.lojaId,
            obj.loja,
            obj.imageUrl,
        )
    }
}

