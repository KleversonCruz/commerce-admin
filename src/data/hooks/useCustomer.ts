import Customer from "@data/core/Customer"
import { useEffect, useState } from "react"
import useNotify from "./useNotify"
import { DeleteRequest, GetCustomers, AddCustomer, UpdateCustomer } from "@data/services/customerServices"
import useApp from "./UseApp"

interface parameters {
    name?: string
    page?: number
    limit?: number
}

const queryParams: parameters = { limit: 20 }

export default function useCustomer() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const { shop } = useApp()

    const [customer, setCustomer] = useState<Customer>(Customer.createVoid())
    const [customers, setCustomers] = useState<Customer[]>([])
    const [pagination, setPagination] = useState<any>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)

    useEffect(() => {
        async function loadProducts() {
            if (shop) {
                try {
                    GetCustomers(shop.id).then(response => {
                        setCustomers(response.items)
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
            await GetCustomers(shop.id, paramaters).then(response => {
                setCustomers(response.items)
                setPagination(response.pagination)
            })
            setDialogCardOpen(false)
        } catch (error) {
            notifyError(`Houve um erro: ${error.message}'`)
        }
    }

    async function save(customer: Customer) {
        const toastId = notifyLoading('Salvando...')
        try {
            if (customer.id === 0) {
                await AddCustomer(customer);
            } else {
                await UpdateCustomer(customer);
            }

            get()
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    async function remove(customer: Customer) {
        const toastId = notifyLoading('Excluindo...')
        try {
            await DeleteRequest(customer);
            get()
            notifyLoadingUpdate(toastId, 'Excluido com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    function select(customer: Customer) {
        setCustomer(customer)
        setDialogCardOpen(true)
    }

    function add() {
        setCustomer(Customer.createVoid())
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
        customer,
        customers,
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