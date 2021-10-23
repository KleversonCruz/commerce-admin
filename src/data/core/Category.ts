import Shop from "./Shop"
import Product from "./Product"

export default class Category {
    #id: number
    #name: string
    #desc: string
    #imageUrl: string
    #imageFile: any
    #isActive: boolean
    #products: Product[]
    #shopId: number
    #shop: Shop

    constructor(id: number, name: string, desc: string, imageUrl: string, imageFile: any, isActive: boolean, products: Product[], shopId: number, shop: Shop) {
        this.#id = id
        this.#name = name
        this.#desc = desc
        this.#imageUrl = imageUrl
        this.#imageFile = imageFile
        this.#isActive = isActive
        this.#products = products
        this.#shopId = shopId
        this.#shop = shop
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    get desc() {
        return this.#desc
    }

    get products() {
        return this.#products
    }

    get imageUrl() {
        return this.#imageUrl
    }

    get imageFile() {
        return this.#imageFile
    }

    get isActive() {
        return this.#isActive
    }

    get shopId() {
        return this.#shopId
    }

    get shop() {
        return this.#shop
    }

    toObject() {
        return {
            id: this.#id,
            name: this.#name,
            desc: this.#desc,
            imageUrl: this.#imageUrl,
            isActive: this.#isActive,
            products: this.#products,
            shopId: this.#shopId,
            shop: this.#shop,
        }
    }

    static createVoid() {
        return new Category(
            0,
            '',
            '',
            '',
            null,
            true,
            [],
            0,
            null,
        )
    }

    static createObject(obj: Category): Category {
        return new Category(
            obj.id,
            obj.name,
            obj.desc,
            obj.imageUrl,
            obj.imageFile,
            obj.isActive,
            obj.products,
            obj.shopId,
            obj.shop,
        )
    }
}

