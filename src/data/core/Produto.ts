import Categoria from "./Categoria"
import Loja from "./Loja"

export default class Produto {
    #id: number
    #nome: string
    #descricao: string
    #valor: number
    #qtdeEstoque: number
    #ativo: boolean
    #categoriaId: number
    #categoria: Categoria
    #lojaId: number
    #loja: Loja
    #imageUrl: string

    constructor(id: number, nome: string, descricao: string, valor: number, qtdeEstoque: number,
        ativo: boolean, categoriaId: number, categoria: Categoria, lojaId: number, loja: Loja,
        imageUrl: string) {
        this.#id = id
        this.#nome = nome
        this.#descricao = descricao
        this.#valor = valor
        this.#qtdeEstoque = qtdeEstoque
        this.#ativo = ativo
        this.#categoriaId = categoriaId
        this.#categoria = categoria
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

    get valor() {
        return this.#valor
    }

    get qtdeEstoque() {
        return this.#qtdeEstoque
    }

    get ativo() {
        return this.#ativo
    }

    get categoriaId() {
        return this.#categoriaId
    }

    get categoria() {
        return this.#categoria
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

    static createVoid() {
        return new Produto(
            0,
            '',
            '',
            0,
            0,
            true,
            0,
            null,
            0,
            null,
            '',
        )
    }

    toObject() {
        return{
            id: this.#id,
            nome: this.#nome,
            descricao: this.#descricao,
            valor: this.#valor,
            qtdeEstoque: this.#qtdeEstoque,
            ativo: this.#ativo,
            categoriaId: this.#categoriaId,
            lojaId: this.#lojaId,
            imageUrl: this.#imageUrl,
        }
    }

    static createObject(obj: Produto): Produto {
        return new Produto(
            obj.id,
            obj.nome,
            obj.descricao,
            obj.valor,
            obj.qtdeEstoque,
            obj.ativo,
            obj.categoriaId,
            obj.categoria,
            obj.lojaId,
            obj.loja,
            obj.imageUrl,
        )
    }
}

