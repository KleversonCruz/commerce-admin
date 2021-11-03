import Product from "./Product"
import Category from "./Category"
import Customer from "./Customer"

export default class Loja {
    #id: number
    #cnpj: string
    #name: string
    #desc: string
    #email: string
    #brandImageUrl: string
    #brandImageFile: any
    #imageUrl: string
    #imageFile: any
    #colorTheme: string
    #products: Product[]
    #categories: Category[]
    #customers: Customer[]

    constructor(id: number, cnpj: string, name: string, desc: string, email: string, brandImageUrl: string, brandImageFile: any, imageUrl: string, imageFile: any, colorTheme: string, categories: Category[], products: Product[], customers: Customer[]) {
        this.#id = id
        this.#cnpj = cnpj
        this.#name = name
        this.#desc = desc
        this.#email = email
        this.#brandImageUrl = brandImageUrl
        this.#brandImageFile = brandImageFile
        this.#imageUrl = imageUrl
        this.#imageFile = imageFile
        this.#colorTheme = colorTheme
        this.#products = products
        this.#categories = categories
        this.#customers = customers
    }

    get id() {
        return this.#id
    }

    get cnpj() {
        return this.#cnpj
    }

    get name() {
        return this.#name
    }

    get desc() {
        return this.#desc
    }

    get email() {
        return this.#email
    }

    get brandImageFile() {
        return this.#brandImageFile
    }

    get brandImageUrl() {
        return this.#brandImageUrl
    }

    get imageFile() {
        return this.#imageFile
    }

    get imageUrl() {
        return this.#imageUrl
    }

    get colorTheme() {
        return this.#colorTheme
    }

    get products() {
        return this.#products
    }

    get categories() {
        return this.#categories
    }

    get customers() {
        return this.#customers
    }

    toObject() {
        return {
            id: this.#id,
            cnpj: this.#cnpj,
            name: this.#name,
            desc: this.#desc,
            email: this.#email,
            brandImageUrl: this.#brandImageUrl,
            brandImageFile: this.#brandImageFile,
            imageUrl: this.#imageUrl,
            imageFile: this.#imageFile,
            colorTheme: this.#colorTheme,
            categories: this.#categories?.map(resp => resp.toObject()),
            products: this.#products?.map(resp => resp.toObject()),
            customers: this.#customers?.map(resp => resp.toObject()),
        }
    }

    static createObject(obj: Loja): Loja {
        return new Loja(
            obj.id,
            obj.cnpj,
            obj.name,
            obj.desc,
            obj.email,
            obj.brandImageUrl,
            obj.brandImageFile,
            obj.imageUrl,
            obj.imageFile,
            obj.colorTheme,
            obj.categories,
            obj.products,
            obj.customers,
        )
    }
}

