import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import SelectInput from "@components/elements/inputs/selectInput";
import TextArea from "@components/elements/inputs/textArea";
import Categoria from "@data/core/Categoria";
import Produto from "@data/core/Produto";
import { FolderIcon } from "@heroicons/react/outline";
import { useForm, } from "react-hook-form";

interface FormProps {
    produto: Produto
    categorias: Categoria[]
    saveAction?: (produto: Produto) => void
    cancelAction?: (any) => void
}

export default function Form(props: FormProps) {
    const { register, handleSubmit, setValue } = useForm()
    const id = props.produto?.id

    setValue('id', id);
    setValue('nome', props.produto.nome);
    setValue('descricao', props.produto.descricao);
    setValue('valor', props.produto.valor);
    setValue('qtdeEstoque', props.produto.qtdeEstoque);
    setValue('ativo', props.produto.ativo);
    setValue('categoriaId', props.produto.categoriaId);
    setValue('imageUrl', props.produto.imageUrl);

    const onSubmit = async (data) => {
        await props.saveAction(Produto.createObject(data))
    }

    function renderSelectItems(): any {
        return props.categorias?.map(categoria => {
            return {
                id: categoria.id,
                name: categoria.nome,
            }
        })
    }

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-4 py-5 space-y-6 sm:p-6 flex-grow">
                    <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="mt-6 flex-grow lg:mt-0 lg:mr-6 lg:flex-grow-0 lg:flex-shrink-0">
                            <p className="mb-1 text-sm" aria-hidden="true">
                                Imagem
                            </p>
                            <div className="lg:hidden mb-4">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 inline-block rounded-md overflow-hidden h-14 w-14"
                                        aria-hidden="true"
                                    >
                                        {props.produto?.imageUrl ? (
                                            <img className="h-full w-full rounded-md" src={props.produto?.imageUrl} alt={props.produto?.nome} />
                                        ) : (
                                            <span className="inline-block h-full w-full rounded-md overflow-hidden bg-th-accent-medium">
                                                <FolderIcon className="text-gray-100 h-full w-full p-2" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="ml-5 rounded-md shadow-sm">
                                        <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500">
                                            <label
                                                htmlFor="user-photo"
                                                className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                            >
                                                <span>Mudar</span>
                                                <span className="sr-only"> user photo</span>
                                            </label>
                                            <input
                                                id="user-photo"
                                                name="user-photo"
                                                type="file"
                                                className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                tabIndex={-1}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden relative rounded-md overflow-hidden lg:block w-40 h-40">
                                {props.produto?.imageUrl ? (
                                    <img className="relative rounded-md " src={props.produto?.imageUrl} alt={props.produto?.nome} />
                                ) : (
                                    <span className="relative inline-block rounded-md overflow-hidden bg-th-accent-medium">
                                        <FolderIcon className=" h-full w-full p-10" />
                                    </span>
                                )}
                                <label
                                    htmlFor="user-photo"
                                    className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                                >
                                    <span>Mudar</span>
                                    <span className="sr-only"> user photo</span>
                                    <input
                                        type="file"
                                        id="user-photo"
                                        name="user-photo"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                        tabIndex={-1}
                                    />
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex-grow space-y-6">
                            <input type="number" hidden {...register('id')} />
                            <div>
                                <FormGroup register={register} label="Nome" id={"nome"} placeholder="Nome do produto" />
                            </div>
                            <div>
                                <TextArea register={register} label="Descrição" id={"descricao"} placeholder="Descrição do produto" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                            <FormGroup register={register} label="URL da imagem" id={"imageUrl"} placeholder="https://minhaimagem/imagem.jpg" />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormGroup register={register} label="Qtde. estoque" id={"qtdeEstoque"} type="number" />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormGroup register={register} label="Valor" id={"valor"} />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <SelectInput register={register} label="Categoria" id="categoriaId" required selectItems={renderSelectItems()} />
                        </div>


                        <div className="col-span-12 sm:col-span-6">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        type="checkbox"
                                        {...register('ativo')}
                                        className="focus:ring-gray-500 h-4 w-4 text-th-accent-medium border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-medium">
                                        Ativo
                                    </label>
                                    <p className="text-gray-500">Permite que o produto apareça na página da loja</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <PrimaryButton type={'submit'} className="w-full justify-center sm:ml-3 sm:w-auto sm:text-sm bg-th-accent-medium hover:bg-th-accent-dark">
                        {id === 0 ? 'Salvar' : 'Alterar'}
                    </PrimaryButton>
                    <SecondaryButton 
                        className="mt-3 sm:mt-0 w-full justify-center sm:ml-3 sm:w-auto sm:text-sm border" onClick={() => props.cancelAction?.(false)}>
                        Cancelar
                    </SecondaryButton>
                </div>
            </form>
        </div>
    )
}