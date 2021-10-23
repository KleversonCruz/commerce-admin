import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import ImgInput from "@components/elements/inputs/imgInput";
import SelectInput from "@components/elements/inputs/selectInput";
import TextArea from "@components/elements/inputs/textArea";
import Category from "@data/core/Category";
import Product from "@data/core/Product";
import { PhotographIcon } from "@heroicons/react/outline";
import { useForm, } from "react-hook-form";

interface FormProps {
    product: Product
    categories: Category[]
    saveAction?: (product: Product) => void
    cancelAction?: (any) => void
}

export default function Form(props: FormProps) {
    const { register, handleSubmit, setValue } = useForm()
    const id = props.product?.id

    setValue('id', id);
    setValue('name', props.product.name);
    setValue('desc', props.product.desc);
    setValue('price', props.product.price);
    setValue('isActive', props.product.isActive);
    setValue('categoryId', props.product.categoryId);
    setValue('imageUrl', props.product.imageUrl);

    const onSubmit = async (data) => {
        await props.saveAction(Product.createObject(data))
    }

    function renderSelectItems(): any {
        return props.categories?.map(categoria => {
            return {
                id: categoria.id,
                name: categoria.name,
            }
        })
    }

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-4 py-5 space-y-6 sm:p-6 flex-grow">
                    <div className="mt-6 flex flex-col lg:flex-row">
                        <ImgInput register={register} label="Imagem" id={"imageFile"} icon={PhotographIcon} imageUrl={props.product.imageUrl} />
                        <div className="flex-grow space-y-6">
                            <input type="number" hidden {...register('id')} />
                            <input type="number" hidden {...register('imageUrl')} />

                            <div>
                                <FormGroup register={register} label="Nome" id={"name"} placeholder="Nome do produto" required />
                            </div>
                            <div>
                                <TextArea register={register} label="Descrição" id={"desc"} placeholder="Descrição do produto" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                            <FormGroup register={register} label="Valor" id={"price"} />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <SelectInput register={register} label="Categoria" id="categoryId" required selectItems={renderSelectItems()} />
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