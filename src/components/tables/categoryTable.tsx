import Pagination from "@components/navigation/pagination";
import Category from "@data/core/Category"
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import SearchInput from "@components/elements/inputs/searchInput";
import AlertModal from "@components/overlays/alertModal";
import Image from 'next/image'
import { PencilIcon, PhotographIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@data/services/api";

interface TableProps {
  categories: Category[]
  selectAction: (categories: Category) => void
  deleteAction: (categories: Category) => void
  searchAction: (param: string) => void
  addAction: () => void
  paginate: (params?: any) => void
  pagination: any
}

export default function Table(props: TableProps) {
  const { register, handleSubmit } = useForm()

  const [alertModalopenOpen, setAlertModalOpen] = useState(false)
  const [selectedItem, setSelectectItem] = useState<Category>()

  const onPageChange = pageNumber => props.paginate(pageNumber)

  const onSearch = async (data) => {
    props.searchAction(data.search)
  }

  return (
    <>
      <div className="overflow-hidden shadow rounded-lg divide-y 
        divide-gray-200 dark:divide-warmGray-900 bg-gray-50 dark:bg-warmGray-800 "
      >
        {/* card head*/}
        <div className="px-4 py-5 sm:px-6">
          <form onSubmit={handleSubmit(onSearch)}>
            <div className="mt-6 flex space-x-4">
              <SearchInput placeholder="Pesquisar..." register={register} id={"search"} />
              <SecondaryButton
                onClick={props.addAction}
                className="inline-flex justify-center px-3.5 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
              border-gray-300 dark:border-warmGray-900"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Add</span>
              </SecondaryButton>
            </div>
          </form>
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
                          Situação
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-warmGray-900">
                      {props.categories?.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {item?.imageUrl ? (
                                  <img className="h-10 w-10 rounded-md" src={`${api.defaults.baseURL}/images/${item.imageUrl}`} alt="" />
                                ) : (
                                  <span className="inline-block h-10 w-10 rounded-md overflow-hidden bg-th-accent-medium">
                                    <PhotographIcon className="text-gray-100 h-full w-full p-2" />
                                  </span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium ">{item.name}</div>
                                <div className="text-sm">{item.desc}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.isActive ? (
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
                                onClick={() => { setSelectectItem(item), setAlertModalOpen(true) }}
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
          <Pagination pagination={props?.pagination} onPageChange={onPageChange} />
        </div>
      </div>

      <AlertModal title="Atenção" message="Deseja excluir esse registro?"
        confirmAction={() => props.deleteAction?.(selectedItem)} open={alertModalopenOpen} setOpen={setAlertModalOpen}
      />
    </>
  )
}
