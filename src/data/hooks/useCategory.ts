import Category from "@data/core/Category"
import useNotify from "./useNotify"
import useApp from "./UseApp"
import { useEffect, useState } from "react"
import { DeleteCategory, GetCategories, AddCategory, UpdateCategory } from "@data/services/categoryServices"

interface parameters {
    name?: string
    page?: number
    limit?: number
}

const queryParams: parameters = { limit: 20 }

export default function useCategoria() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const { shop } = useApp()

    const [category, setCategory] = useState<Category>(Category.createVoid())
    const [categories, setCategories] = useState<Category[]>([])
    const [pagination, setPagination] = useState<any>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)

    useEffect(() => {
        async function loadProducts() {
            if (shop) {
                try {
                    GetCategories(shop.id).then(response => {
                        setCategories(response.items)
                        setPagination(response.pagination)
                    })
                    setDialogCardOpen(false)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        loadProducts()
    }, [shop]);

    async function get(paramaters?: parameters) {
        try {
            await GetCategories(shop.id, paramaters).then(response => {
                setCategories(response.items)
                setPagination(response.pagination)
            })
            setDialogCardOpen(false)
        } catch (error) {
            notifyError(`Houve um erro: ${error.message}'`)
        }
    }

    async function save(category: Category) {
        const toastId = notifyLoading('Salvando...')
        try {
            if (category.id === 0) {
                await AddCategory(category);
            } else {
                await UpdateCategory(category);
            }

            get()
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    async function remove(category: Category) {
        const toastId = notifyLoading('Excluindo...')
        try {
            await DeleteCategory(category);
            get()
            notifyLoadingUpdate(toastId, 'Excluido com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    function select(category: Category) {
        setCategory(category)
        setDialogCardOpen(true)
    }

    function add() {
        setCategory(Category.createVoid())
        setDialogCardOpen(true)
    }

    async function search(name: string) {
        queryParams.name = name;
        queryParams.page = 1;
        await get(queryParams);
    }

    async function paginate(page: number) {
        queryParams.page = page;
        await get(queryParams);
    }

    return {
        category,
        categories,
        dialogCardOpen,
        pagination,
        setDialogCardOpen,
        add,
        save,
        remove,
        select,
        get,
        search,
        paginate
    }
}