import Pagination from "@components/navigation/pagination";
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, TagIcon, TrashIcon, UserIcon } from "@heroicons/react/outline";
import Cliente from "@data/core/Cliente"
import { useState } from "react";
import SearchInput from "@components/elements/inputs/searchInput";
import SecondaryButton from "@components/elements/buttons/secondaryButton";

interface TableProps {
  clientes: Cliente[]
  selectAction: (clientes: Cliente) => void
  deleteAction: (clientes: Cliente) => void
  searchAction: (param: string) => void
  addAction: () => void
}

export default function Table(props: TableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage] = useState(10)

  const indexOfLast = currentPage * entriesPerPage
  const indexOfFirst = indexOfLast - entriesPerPage
  const currentEntries = props.clientes.slice(indexOfFirst, indexOfLast)
  const onPageChange = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="overflow-hidden shadow rounded-lg divide-y 
      divide-gray-200 dark:divide-warmGray-900 bg-gray-50 dark:bg-warmGray-800 
    ">
      {/* card head*/}
      <div className="px-4 py-5 sm:px-6">
        <div className="mt-6 flex space-x-4">
          <SearchInput placeholder="Pesquisar..." searchAction={props.searchAction} />
        </div>
      </div>

      {/* card body*/}
      <div className="px-4 py-4 sm:p-6">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-warmGray-900">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Nome
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Contato
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Endereço
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Situação
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-warmGray-900">
                    {currentEntries?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <span className="inline-block h-10 w-10 rounded-md overflow-hidden bg-th-accent-medium">
                                <UserIcon className="text-gray-100 h-full w-full p-2" />
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{item.nome}</div>
                              <div className="text-sm">{item.sobrenome}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium">{item.telefone}</div>
                              <div className="text-sm">{item.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium">{item.enderecos[0]?.logradouro}</div>
                              <div className="text-sm">{`${item.enderecos[0]?.cidade} / ${item.enderecos[0]?.uf}`}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-600">
                              Ativo
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-600">
                              Inativo
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end">
                            <button
                              className="hover:text-blue-400"
                              onClick={() => props.selectAction?.(item)}
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* card footer*/}
      <div className="px-4 py-4 sm:px-6">
        <Pagination entriesPerPage={entriesPerPage} totalEntries={props.clientes.length} onPageChange={onPageChange} currentPage={currentPage} />
      </div>
    </div>
  )
}
