import Category from "./Category"
import Shop from "./Shop"

export default class Product {
    #id: number
    #name: string
    #desc: string
    #price: number
    #isActive: boolean
    #imageUrl: string
    #imageFile: any
    #categoryId: number
    #category: Category
    #shopId: number
    #shop: Shop

    constructor(id: number, name: string, desc: string, price: number, isActive: boolean, 
        imageUrl: string, imageFile: any, categoryId: number, category: Category, shopId: number, shop: Shop){
        this.#id = id
        this.#name = name
        this.#desc = desc
        this.#price = price
        this.#isActive = isActive
        this.#imageUrl = imageUrl
        this.#imageFile = imageFile
        this.#categoryId = categoryId
        this.#category = category
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

    get price() {
        return this.#price
    }

    get isActive() {
        return this.#isActive
    }
    
    get imageUrl() {
        return this.#imageUrl
    }

    get imageFile() {
        return this.#imageFile
    }

    get categoryId() {
        return this.#categoryId
    }

    get category() {
        return this.#category
    }

    get shopId() {
        return this.#shopId
    }

    get shop() {
        return this.#shop
    }

    static createVoid() {
        return new Product(
            0,
            '',
            '',
            0,
            true,
            '',
            null,
            0,
            null,
            0,
            null,
        )
    }

    toObject() {
        return{
            id: this.#id,
            name: this.#name,
            desc: this.#desc,
            price: this.#price,
            isActive: this.#isActive,
            categoryId: this.#categoryId,
            shopId: this.#shopId,
            imageUrl: this.#imageUrl,
        }
    }

    static createObject(obj: Product): Product {
        return new Product(
            obj.id,
            obj.name,
            obj.desc,
            obj.price,
            obj.isActive,
            obj.imageUrl,
            obj.imageFile,
            obj.categoryId,
            obj.category,
            obj.shopId,
            obj.shop,
        )
    }
}

