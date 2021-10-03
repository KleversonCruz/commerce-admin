import Categoria from "@data/core/Categoria"
import { useEffect, useState } from "react"
import useNotify from "./useNotify"
import { DeleteRequest, GetAllRequest, PostRequest, PutRequest } from "@data/services/categoriaServices"
import useApp from "./UseApp"


export default function useCategoria() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const [categoria, setCategoria] = useState<Categoria>(Categoria.createVoid())
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [filtredData, setFiltredData] = useState<Categoria[]>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)
    const { loja } = useApp()

    useEffect(() => {
        if (loja) {
            getAll()
        }
    }, [loja]);

    useEffect(() => {
        setFiltredData(categorias)
    }, [categorias]);

    async function getAll() {
        try {
            const data = await GetAllRequest(loja.id).then(response => {
                return response.data
            })
            setCategorias(data)
            setDialogCardOpen(false)
        } catch (error) {
            notifyError(`Houve um erro: ${error.message}'`)
        }
    }
    
    async function save(categoria: Categoria) {
        const toastId = notifyLoading('Salvando...')
        try{
            if (categoria.id === 0) {
                await PostRequest(categoria);
            } else {
                await PutRequest(categoria);
            }

            getAll()
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        } 
    }

    async function remove(categoria: Categoria) {
        const toastId = notifyLoading('Excluindo...')
        try {
            await DeleteRequest(categoria);
            getAll()
            notifyLoadingUpdate(toastId, 'Excluido com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }
    
    function select(categoria: Categoria) {
        setCategoria(categoria)
        setDialogCardOpen(true)
    }

    function add() {
        setCategoria(Categoria.createVoid())
        setDialogCardOpen(true)
    }

    function search(param: string) {
        const result = categorias.filter((data) => {
            return data.nome.toLowerCase().search(param.toLowerCase()) != -1;
        });
        setFiltredData(result)
    }

    return {
        categoria,
        categorias,
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