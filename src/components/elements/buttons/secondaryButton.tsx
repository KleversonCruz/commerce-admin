interface SecondaryButtonProps {
    onClick?: (e?) => void
    children: any
    className?: string
    type?: 'button' | 'submit'
    tabIndex?: number
}

export default function SecondaryButton(props: SecondaryButtonProps) {
    return (
        <button
            type={props?.type ?? 'button'}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                bg-gray-50 hover:bg-gray-200 dark:bg-warmGray-800 dark:hover:bg-warmGray-900 border-gray-300 dark:border-warmGray-900
            ${props.className}`}
            onClick={props.onClick}
            tabIndex={props.tabIndex}
        >
            {props.children}
        </button>
    )
}