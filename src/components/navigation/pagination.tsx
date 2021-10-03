import SecondaryButton from "@components/elements/buttons/secondaryButton";
import { useEffect, useState } from "react";

interface PaginationProps {
    entriesPerPage: number
    totalEntries: number
    currentPage: number
    onPageChange: (number) => void
}


export default function Pagination(props: PaginationProps) {
    const totalPages = Math.ceil(props.totalEntries / props.entriesPerPage)

    useEffect(() => {
        props.onPageChange(1)
    }, [props.totalEntries]);

    function moveNextPage() {
        props.currentPage !== totalPages ? (
            props.onPageChange(props.currentPage + 1)
        ) : null
    }

    function movePreviousPage() {
        props.currentPage !== 1 ? (
            props.onPageChange(props.currentPage - 1)
        ) : null
    }

    return (
        <nav
            className="flex items-center justify-between"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm">
                    Total de <span className="font-medium">{props.totalEntries}</span> resultados
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
