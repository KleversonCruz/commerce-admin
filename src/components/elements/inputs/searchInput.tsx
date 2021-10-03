import { SearchIcon } from "@heroicons/react/outline"

interface SearchInputProps {
    placeholder?: string
    className?: string
    searchAction: (e) => void
}
export default function SearchInput(props: SearchInputProps) {
    return (
        <>
            <div className="flex-1 min-w-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                        type="search"
                        onChange={e => props.searchAction(e.target.value)}
                        placeholder={props.placeholder}
                        className={`focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 sm:text-sm rounded-md
                  bg-gray-50 dark:bg-warmGray-800 border-gray-300 dark:border-warmGray-900
                  ${props.className}`}
                    />
                </div>
            </div>
        </>
    )
}