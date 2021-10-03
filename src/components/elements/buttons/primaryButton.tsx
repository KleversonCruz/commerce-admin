interface PrimaryButtonProps {
    onClick?: (e?) => void
    children: any
    className?: string
    type?: 'button' | 'submit'
    tabIndex?: number
}

export default function PrimaryButton(props: PrimaryButtonProps) {
    return (
        <button
            type={props?.type ?? 'button'}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:gray-500
                bg-th-accent-medium hover:bg-th-accent-dark text-gray-100
            ${props.className}`}
            onClick={props.onClick}
            tabIndex={props.tabIndex}
        >
            {props.children}
        </button>
    )
}