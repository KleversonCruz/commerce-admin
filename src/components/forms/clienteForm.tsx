import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import Categoria from "@data/core/Categoria";
import Cliente from "@data/core/Cliente";
import { UserIcon } from "@heroicons/react/outline";
import { useForm, } from "react-hook-form";

interface FormProps {
    cliente: Cliente
    saveAction?: (cliente: Cliente) => void
    cancelAction?: (any) => void
}

export default function Form(props: FormProps) {
    const { register, handleSubmit, setValue } = useForm()
    const id = props.cliente?.id

    setValue('id', id);
    setValue('nome', props.cliente.nome);
    setValue('sobrenome', props.cliente.sobrenome);
    setValue('telefone', props.cliente.telefone);
    setValue('email', props.cliente.email);

    const onSubmit = async (data) => {
        await props.saveAction(Cliente.createObject(data))
    }

    function renderEnderecos() {
        return (
            <div className="flex flex-col mt-2">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-3">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-warmGray-700">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Logradouro
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Bairro
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Complemento
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            CEP
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                        >
                                            Cidade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-warmGray-900">
                                    {props.cliente.enderecos?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{`${item.logradouro}, ${item.numero}`}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.bairro}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.complemento}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.cep}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{`${item.cidade} / ${item.uf}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                                        <span className="inline-block h-full w-full rounded-md overflow-hidden bg-th-accent-medium">
                                            <UserIcon className="text-gray-100 h-full w-full p-2" />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden relative rounded-md overflow-hidden lg:block w-40 h-40">
                                <span className="relative inline-block rounded-md overflow-hidden bg-th-accent-medium">
                                    <UserIcon className=" h-full w-full p-10" />
                                </span>
                            </div>
                        </div>
                        <div className="flex-grow space-y-6">
                            <div className="grid grid-cols-12 gap-6">
                                <input type="number" hidden {...register('id')} />
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Nome" id={"nome"} placeholder="Nome do cliente" readonly/>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Sobrenome" id={"sobrenome"} placeholder="Sobrenome do cliente" readonly/>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Email" id={"email"} placeholder="email@email.com.br" type="email" readonly/>
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Telefone" id={"telefone"} placeholder="(99) 9999-9999" type="tel" readonly/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm">
                            Endereços
                        </label>
                        {renderEnderecos()}
                    </div>
                </div>

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <SecondaryButton
                        className="mt-3 sm:mt-0 w-full justify-center sm:ml-3 sm:w-auto sm:text-sm border" onClick={() => props.cancelAction?.(false)}>
                        Cancelar
                    </SecondaryButton>
                </div>
            </form>
        </div>
    )
}