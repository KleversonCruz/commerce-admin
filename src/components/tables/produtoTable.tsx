import Pagination from "@components/navigation/pagination";
import Produto from "@data/core/Produto"
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import SearchInput from "@components/elements/inputs/searchInput";
import { FolderIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import AlertModal from "@components/overlays/alertModal";

interface TableProps {
  produtos: Produto[]
  selectAction: (produtos: Produto) => void
  deleteAction: (produtos: Produto) => void
  searchAction: (param: string) => void
  addAction: () => void
}

export default function Table(props: TableProps) {
  const [alertModalopenOpen, setAlertModalOpen] = useState(false)
  const [selectedItem, setSelectectItem] = useState<Produto>()
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage] = useState(10)

  const indexOfLast = currentPage * entriesPerPage
  const indexOfFirst = indexOfLast - entriesPerPage
  const currentEntries = props.produtos.slice(indexOfFirst, indexOfLast)
  const onPageChange = pageNumber => setCurrentPage(pageNumber)

  return (
    <>
      <div className="overflow-hidden shadow rounded-lg divide-y 
        divide-gray-200 dark:divide-warmGray-900 bg-gray-50 dark:bg-warmGray-800 "
      >
        {/* card head*/}
        <div className="px-4 py-5 sm:px-6">
          <div className="mt-6 flex space-x-4">
            <SearchInput placeholder="Pesquisar..." searchAction={props.searchAction} />
            <SecondaryButton
              onClick={props.addAction}
              className="inline-flex justify-center px-3.5 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              border-gray-300 dark:border-warmGray-900"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Add</span>
            </SecondaryButton>
          </div>
        </div>

        {/* card body*/}
        <div className="px-4 py-4 sm:p-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
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
                          Valor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        >
                          Qtde.
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
                                {item?.imageUrl ? (
                                  <img className="h-10 w-10 rounded-md" src={item?.imageUrl} alt="" />
                                ) : (
                                  <span className="inline-block h-10 w-10 rounded-md overflow-hidden bg-th-accent-medium">
                                    <FolderIcon className="text-gray-100 h-full w-full p-2" />
                                  </span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{item.nome}</div>
                                <div className="text-sm">{item.descricao}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">R$ {item.valor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{item.qtdeEstoque}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.ativo ? (
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
                                className="hover:text-red-400 mr-4"
                                onClick={() => {setSelectectItem(item), setAlertModalOpen(true)}}
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>

                              <button
                                className="hover:text-green-400"
                                onClick={() => props.selectAction?.(item)}
                              >
                                <PencilIcon className="w-5 h-5" />
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
          <Pagination entriesPerPage={entriesPerPage} totalEntries={props.produtos.length} onPageChange={onPageChange} currentPage={currentPage} />
        </div>
      </div>

      <AlertModal title="Atenção" message="Deseja excluir esse registro?"
        confirmAction={() => props.deleteAction?.(selectedItem)} open={alertModalopenOpen} setOpen={setAlertModalOpen}
      />
    </>
  )
}
