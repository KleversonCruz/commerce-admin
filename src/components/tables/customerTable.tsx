import Pagination from "@components/navigation/pagination";
import { EyeIcon, UserIcon } from "@heroicons/react/outline";
import Customer from "@data/core/Customer"
import { useState } from "react";
import SearchInput from "@components/elements/inputs/searchInput";
import { useForm } from "react-hook-form";

interface TableProps {
  customers: Customer[]
  selectAction: (clientes: Customer) => void
  deleteAction: (clientes: Customer) => void
  searchAction: (param: string) => void
  addAction: () => void
  paginate: (params?: any) => void
  pagination: any
}

export default function Table(props: TableProps) {
  const { register, handleSubmit } = useForm()

  const [alertModalopenOpen, setAlertModalOpen] = useState(false)
  const [selectedItem, setSelectectItem] = useState<Customer>()

  const onPageChange = pageNumber => props.paginate(pageNumber)

  const onSearch = async (data) => {
    props.searchAction(data.search)
  }

  return (
    <div className="overflow-hidden shadow rounded-lg divide-y 
      divide-gray-200 dark:divide-warmGray-900 bg-gray-50 dark:bg-warmGray-800 
    ">
      {/* card head*/}
      <div className="px-4 py-5 sm:px-6">
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="mt-6 flex space-x-4">
            <SearchInput placeholder="Pesquisar..." register={register} id={"search"} />
          </div>
        </form>
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
                    {props.customers?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <span className="inline-block h-10 w-10 rounded-md overflow-hidden bg-th-accent-medium">
                                <UserIcon className="text-gray-100 h-full w-full p-2" />
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium">{item.firstName}</div>
                              <div className="text-sm">{item.lastName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium">{item.telephone}</div>
                              <div className="text-sm">{item.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium">{item.addresses[0]?.addressLine1}</div>
                              <div className="text-sm">{`${item.addresses[0]?.city} / ${item.addresses[0]?.state}`}</div>
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
        <Pagination pagination={props?.pagination} onPageChange={onPageChange} />
      </div>
    </div>
  )
}
