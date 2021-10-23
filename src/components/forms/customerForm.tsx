import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import ImgInput from "@components/elements/inputs/imgInput";
import Category from "@data/core/Category";
import Customer from "@data/core/Customer";
import { PhotographIcon, UserIcon } from "@heroicons/react/outline";
import { useForm, } from "react-hook-form";

interface FormProps {
    customer: Customer
    saveAction?: (cliente: Customer) => void
    cancelAction?: (any) => void
}

export default function Form(props: FormProps) {
    const { register, handleSubmit, setValue } = useForm()
    const id = props.customer?.id

    setValue('id', id);
    setValue('firstName', props.customer.firstName);
    setValue('lastName', props.customer.lastName);
    setValue('telephone', props.customer.telephone);
    setValue('email', props.customer.email);

    const onSubmit = async (data) => {
        await props.saveAction(Customer.createObject(data))
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
                                    {props.customer.addresses?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{`${item.addressLine1}, ${item.addressLine2}`}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.addressLine2}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.city}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.state}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{`${item.postalCode} / ${item.state}`}</td>
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
                        <ImgInput register={register} label="Imagem" id={"imageFile"} icon={PhotographIcon} imageUrl={null} />
                        <div className="flex-grow space-y-6">
                            <div className="grid grid-cols-12 gap-6">
                                <input type="number" hidden {...register('id')} />
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Nome" id={"firstName"} placeholder="Nome do cliente" readonly />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Sobrenome" id={"lastName"} placeholder="Sobrenome do cliente" readonly />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Email" id={"email"} placeholder="email@email.com.br" type="email" readonly />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <FormGroup register={register} label="Telefone" id={"telephone"} placeholder="(99) 9999-9999" type="tel" readonly />
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