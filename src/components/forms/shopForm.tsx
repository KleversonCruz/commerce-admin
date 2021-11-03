import PrimaryButton from '@components/elements/buttons/primaryButton'
import SecondaryButton from '@components/elements/buttons/secondaryButton'
import { useForm } from 'react-hook-form'
import useApp from '@data/hooks/UseApp'
import Shop from '@data/core/Shop'
import { BriefcaseIcon, PhotographIcon } from '@heroicons/react/outline'
import FormGroup from '@components/elements/inputs/formGroup'
import TextArea from '@components/elements/inputs/textArea'
import SelectInput from '@components/elements/inputs/selectInput'
import ImgInput from '@components/elements/inputs/imgInput'

interface FormProps {
    shop: Shop
    saveAction?: (loja: Shop) => void
    cancelAction?: (any) => void
}

export default function Form(props: FormProps) {
    const { register, handleSubmit, setValue } = useForm()
    const { themes } = useApp()
    const id = props.shop?.id

    setValue('id', id);
    setValue('name', props.shop.name);
    setValue('desc', props.shop.desc);
    setValue('cnpj', props.shop.cnpj);
    setValue('email', props.shop.email);
    setValue('colorTheme', props.shop.colorTheme);
    setValue('brandImageUrl', props.shop.brandImageUrl);
    setValue('imageUrl', props.shop.imageUrl);

    const onSubmit = async (data) => {
        console.log(data)
        await props.saveAction(Shop.createObject(data))
    }

    function renderSelectItems(): any {
        return themes?.map(theme => {
            return {
                id: theme.name,
                name: theme.name,
            }
        })
    }

    return (
        <div className="h-full flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-4 py-5 space-y-6 sm:p-6 flex-grow">
                    <div className="mt-6 flex flex-col lg:flex-row">
                        <ImgInput register={register} label="Logo" id={"brandImageFile"} icon={PhotographIcon} imageUrl={props.shop.brandImageUrl} />

                        <div className="flex-grow space-y-6">
                            <input type="number" hidden {...register('id')} />
                            <input hidden {...register('imageUrl')} />
                            <input hidden {...register('brandImageUrl')} />

                            <div>
                                <FormGroup register={register} label="Nome" id={"name"} placeholder="Nome da loja" required />
                            </div>
                            <div>
                                <TextArea register={register} label="Descrição" id={"desc"} placeholder="Uma breve descrição de sua loja" rows={2} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-12 gap-6">
                        <div className="col-span-12 sm:col-span-6">
                            <FormGroup register={register} label="CNPJ" id={"cnpj"} placeholder="00.000.000/0000-00" />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <FormGroup register={register} label="Email" id={"email"} placeholder="email@email.com.br" />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <SelectInput register={register} label="Tema" id="colorTheme" required selectItems={renderSelectItems()} />
                        </div>
                    </div>
                    <div className="mt-4 space-y-4">
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
                                <p>Permite que a loja esteja disponível</p>
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