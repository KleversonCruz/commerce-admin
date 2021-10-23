import Product from "@data/core/Product"
import useNotify from "./useNotify"
import useApp from "./UseApp"
import { useEffect, useState } from "react"
import { DeleteProduct, GetProducts, AddProduct, UpdateProduct } from "@data/services/productServices"

interface parameters {
    name?: string
    page?: number
    limit?: number
}

const queryParams: parameters = { limit: 20 }

export default function useProduct() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const { shop } = useApp()

    const [product, setProduct] = useState<Product>(Product.createVoid())
    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPagination] = useState<any>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)

    useEffect(() => {
        async function loadProducts() {
            if (shop) {
                try {
                    GetProducts(shop.id).then(response => {
                        setProducts(response.items)
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
            await GetProducts(shop.id, paramaters).then(response => {
                setProducts(response.items)
                setPagination(response.pagination)
            })
            setDialogCardOpen(false)
        } catch (error) {
            notifyError(`Houve um erro: ${error.message}'`)
        }
    }

    async function save(product: Product) {
        const toastId = notifyLoading('Salvando...')
        try {
            if (product.id === 0) {
                await AddProduct(product);
            } else {
                await UpdateProduct(product);
            }

            get()
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    async function remove(product: Product) {
        const toastId = notifyLoading('Excluindo...')
        try {
            await DeleteProduct(product);
            get()
            notifyLoadingUpdate(toastId, 'Excluido com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    function select(product: Product) {
        setProduct(product)
        setDialogCardOpen(true)
    }

    function add() {
        setProduct(Product.createVoid())
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
        product,
        products,
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