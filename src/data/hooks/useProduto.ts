import Produto from "@data/core/Produto"
import { useEffect, useState } from "react"
import useNotify from "./useNotify"
import { DeleteRequest, GetAllRequest, PostRequest, PutRequest } from "@data/services/produtoServices"
import { GetAllRequest as GetAllCategorias} from "@data/services/categoriaServices"
import useAuth from "./UseAppAuth"
import Categoria from "@data/core/Categoria"
import useApp from "./UseApp"


export default function useProduto() {
    const { notifyLoading, notifyLoadingUpdate, notifyError } = useNotify()
    const [produto, setProduto] = useState<Produto>(Produto.createVoid())
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [filtredData, setFiltredData] = useState<Produto[]>([])
    const [dialogCardOpen, setDialogCardOpen] = useState(false)
    const { loja } = useApp()

    useEffect(() => {
        if (loja) {
            getAll()
        }
    }, [loja]);

    useEffect(() => {
        setFiltredData(produtos)
    }, [produtos]);

    async function getAll() {
        try {
            const produtos = await GetAllRequest(loja.id).then(response => {
                return response.data
            })
            setProdutos(produtos)

            const categorias = await GetAllCategorias(loja.id).then(response => {
                return response.data
            })
            setCategorias(categorias)

            setDialogCardOpen(false)
        } catch (error) {
            notifyError(`Houve um erro: ${error.message}'`)
        }
    }
    
    async function save(produto: Produto) {
        const toastId = notifyLoading('Salvando...')
        try{
            if (produto.id === 0) {
                await PostRequest(produto);
            } else {
                await PutRequest(produto);
            }

            getAll()
            notifyLoadingUpdate(toastId, 'Salvo com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        } 
    }

    async function remove(produto: Produto) {
        const toastId = notifyLoading('Excluindo...')
        try {
            await DeleteRequest(produto);
            getAll()
            notifyLoadingUpdate(toastId, 'Excluido com sucesso', 'success')
        } catch (error) {
            notifyLoadingUpdate(toastId, `Houve um erro: ${error.message}'`, 'error')
        }
    }

    function select(produto: Produto) {
        setProduto(produto)
        setDialogCardOpen(true)
    }

    function add() {
        setProduto(Produto.createVoid())
        setDialogCardOpen(true)
    }

    function search(param: string) {
        const result = produtos.filter((data) => {
            return data.nome.toLowerCase().search(param.toLowerCase()) != -1;
        });
        setFiltredData(result)
    }

    return {
        produto,
        produtos,
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