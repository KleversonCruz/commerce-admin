import Cliente from "@data/core/Cliente"
import { useEffect, useState } from "react"
import useNotify from "./useNotify"
import { DeleteRequest, GetAllRequest, PostRequest, PutRequest } from "@data/services/clientesServices"
import useApp from "./UseApp"


export default function useCliente() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const [cliente, setCliente] = useState<Cliente>(Cliente.createVoid())
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [filtredData, setFiltredData] = useState<Cliente[]>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)
    const { loja } = useApp()

    useEffect(() => {
        if (loja) {
            getAll()
        }
    }, [loja]);

    useEffect(() => {
        setFiltredData(clientes)
    }, [clientes]);

    async function getAll() {
        try {
            const data = await GetAllRequest(loja.id).then(response => {
                return response.data
            })
            setClientes(data)
            setDialogCardOpen(false)
        } catch (error) {
            notifyError(`Houve um erro: ${error.message}'`)
        }
    }

    async function save(cliente: Cliente) {
        const toastId = notifyLoading('Salvando...')
        try {
            if (cliente.id === 0) {
                await PostRequest(cliente);
            } else {
                await PutRequest(cliente);
            }

            getAll()
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    async function remove(cliente: Cliente) {
        const toastId = notifyLoading('Excluindo...')
        try {
            await DeleteRequest(cliente);
            getAll()
            notifyLoadingUpdate(toastId, 'Excluido com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    function select(cliente: Cliente) {
        setCliente(cliente)
        setDialogCardOpen(true)
    }

    function add() {
        setCliente(Cliente.createVoid())
        setDialogCardOpen(true)
    }

    function search(param: string) {
        const result = clientes.filter((data) => {
            return data.nome.toLowerCase().search(param.toLowerCase()) != -1;
        });
        setFiltredData(result)
    }

    return {
        cliente,
        clientes,
        filtredData,
        dialogCardOpen,
        setDialogCardOpen,
        add,
        save,
        remove,
        select,
        getAll,
        search,
    }
}