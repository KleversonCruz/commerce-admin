export default class LojaConfig {
    #id: number
    #corPrimaria: string
    #corSecundaria: string

    constructor(id: number, corPrimaria: string, corSecundaria: string) {
        this.#id = id
        this.#corPrimaria = corPrimaria
        this.#corSecundaria = corSecundaria
    }

    get id() {
        return this.#id
    }

    get corPrimaria() {
        return this.#corPrimaria
    }

    get corSecundaria() {
        return this.#corSecundaria
    }

    toObject() {
        return{
            id: this.#id,
            corPrimaria: this.#corPrimaria,
            corSecundaria: this.#corSecundaria,
        }
    }

    static createObject(obj: LojaConfig): LojaConfig {
        return new LojaConfig(
            obj.#id,
            obj.corPrimaria,
            obj.corSecundaria,
        )
    }
}

