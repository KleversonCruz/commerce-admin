interface FormGroupProps {
    label: string
    id: string
    register: any
    required?: boolean
    type?: string
    placeholder?: string
    className?: string
    readonly?: boolean
}

export default function FormGroup(props: FormGroupProps) {
    const register = props.register
    return (
        <>
            <label className="block text-sm">
                {props.label}
            </label>
            <input
                type={props?.type ?? 'text'}
                required={props.required}
                readOnly={props.readonly}
                {...register(props.id)}
                placeholder={props.placeholder}
                className={`mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm  rounded-md
                    bg-gray-50 dark:bg-warmGray-900 border-gray-300 dark:border-warmGray-700
                    ${props.className}`}
            />
        </>
    )
}