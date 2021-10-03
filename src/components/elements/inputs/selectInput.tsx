interface SelectInputProps {
    label: string
    id: string
    register: any
    required?: boolean
    className?: string
    selectItems: any
}

export default function SelectInput(props: SelectInputProps) {
    const register = props.register

    function renderSelect() {
        return props.selectItems?.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        }
        )
    }

    return (
        <>
            <label className="block text-sm">
                {props.label}
            </label>
            <select
                required={props.required}
                {...register(props.id)}
                className={`mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm rounded-md
                    bg-gray-50 dark:bg-warmGray-900 border-gray-300 dark:border-warmGray-700
                    ${props.className}`}
            >
                {renderSelect()}
            </select>
        </>
    )
}