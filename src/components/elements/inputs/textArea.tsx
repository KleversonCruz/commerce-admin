interface TextAreaProps {
    label: string
    id: string
    register: any
    placeholder?: string
    rows?: number
    className?: string
}
export default function TextArea(props: TextAreaProps) {
    const register = props.register
    return (
        <>
            <label className="block text-sm">
                {props.label}
            </label>
            <div className="mt-1">
                <textarea
                    {...register(props.id)}
                    placeholder={props.placeholder}
                    rows={props?.rows ?? 3}
                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border rounded-md
                    bg-gray-50 dark:bg-warmGray-900 border-gray-300 dark:border-warmGray-700
                    ${props.className}`}
                />
            </div>
        </>
    )
}