import Loja from "@data/core/Loja"
import { useEffect, useState } from "react"
import useNotify from "./useNotify"
import { GetAllRequest, GetOneRequest, PostRequest, PutRequest } from "@data/services/lojaServices"
import { GetAllRequest as GetAllProdutos } from "@data/services/produtoServices"
import { GetAllRequest as GetAllCategorias } from "@data/services/produtoServices"
import Produto from "@data/core/Produto"
import Categoria from "@data/core/Categoria"
import useAuth from "./UseAppAuth"
import useApp from "./UseApp"


export default function useLoja() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)
    const { loja, loadLoja } = useApp()

    async function getLojaProdutos(lojaId: number) {
        try {
            const loja = await GetOneRequest(lojaId).then(response => {
                return response.data
            })
            const produtos = await GetAllProdutos(lojaId).then(response => {
                return response.data
            })
            setProdutos(produtos)

        } catch (error) {
            console.log(`Houve um erro: ${error.message}'`)
        }
    }

    async function getLoja(lojaId: number) {
        try {
            loadLoja(lojaId)
            setDialogCardOpen(false)
        } catch (error) {
            console.log(`Houve um erro: ${error.message}'`)
        }
    }

    function select(loja: Loja) {
        setDialogCardOpen(true)
    }

    async function save(loja: Loja) {
        const toastId = notifyLoading('Salvando...')
        try{
            await PutRequest(loja);
            loadLoja(loja.id)
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
            setDialogCardOpen(false)
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        } 
    }

    return {
        loja,
        produtos,
        dialogCardOpen,
        setDialogCardOpen,
        getLoja,
        getLojaProdutos,
        select,
        save,
    }
}