import Loja from "@data/core/Shop"
import { useState } from "react"
import useNotify from "./useNotify"
import { UpdateShop } from "@data/services/shopServices"
import useApp from "./UseApp"


export default function useLoja() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const [dialogCardOpen, setDialogCardOpen] = useState(false)
    const { shop, loadShop } = useApp()

    async function getLoja(lojaId: number) {
        try {
            loadShop(lojaId)
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
        try {
            await UpdateShop(loja);
            loadShop(loja.id)
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
            setDialogCardOpen(false)
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    return {
        loja: shop,
        dialogCardOpen,
        setDialogCardOpen,
        getLoja,
        select,
        save,
    }
}