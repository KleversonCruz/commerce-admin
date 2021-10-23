import SecondaryButton from "@components/elements/buttons/secondaryButton";

interface PaginationProps {
    pagination: any
    onPageChange: (number) => void
}


export default function Pagination(props: PaginationProps) {
    function moveNextPage() {
        props.pagination?.links.Next ? (
            props.onPageChange(props.pagination?.currentPage + 1)
        ) : null
    }

    function movePreviousPage() {
        props.pagination?.links.Prev ? (
            props.onPageChange(props.pagination?.currentPage - 1)
        ) : null
    }

    return (
        <nav
            className="flex items-center justify-between"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm">
                    Total de <span className="font-medium">{props.pagination.totalItems}</span> resultados
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                <SecondaryButton
                    onClick={movePreviousPage}
                    className="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md"
                >
                    Anterior
                </SecondaryButton>
                <SecondaryButton
                    onClick={moveNextPage}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md"
                >
                    Próximo
                </SecondaryButton>
            </div>
        </nav>
    )
}
