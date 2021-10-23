import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import ImgInput from "@components/elements/inputs/imgInput";
import TextArea from "@components/elements/inputs/textArea";
import Category from "@data/core/Category";
import { PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

interface FormProps {
    category: Category
    saveAction?: (categoria: Category) => void
    cancelAction?: (any) => void
}

export default function Form(props: FormProps) {
    const { register, handleSubmit, setValue } = useForm()
    const id = props.category?.id

    setValue('id', id);
    setValue('name', props.category.name);
    setValue('desc', props.category.desc);
    setValue('isActive', props.category.isActive);
    setValue('imageUrl', props.category.imageUrl);

    const onSubmit = async (data) => {
        await props.saveAction(Category.createObject(data))
    }

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-4 py-5 space-y-6 sm:p-6 flex-grow">
                    <div className="mt-6 flex flex-col lg:flex-row">
                        <ImgInput register={register} label="Imagem" id={"imageFile"} icon={PhotographIcon} imageUrl={props.category.imageUrl} />
                        <div className="flex-grow space-y-6">
                            <input type="number" hidden {...register('id')} />
                            <input type="number" hidden {...register('imageUrl')} />

                            <div>
                                <FormGroup register={register} label="Nome" id={"name"} placeholder="Nome da categoria" required />
                            </div>
                            <div>
                                <TextArea register={register} label="Descrição" id={"desc"} placeholder="Descrição da categoria" />
                            </div>
                            <div className="col-span-12 sm:col-span-6">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            {...register('isActive')}
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
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <PrimaryButton
                        type={'submit'} className="w-full justify-center sm:ml-3 sm:w-auto sm:text-sm">
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