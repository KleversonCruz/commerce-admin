import useAuth from "@data/hooks/UseAppAuth";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuAlt2Icon, UserIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import FormModal from "@components/overlays/formModal";
import Form from "@components/forms/shopForm";
import useLoja from "@data/hooks/useShop";
import AlertModal from "@components/overlays/alertModal";

export default function Navbar(props) {
    const [alertModalopenOpen, setAlertModalOpen] = useState(false)
    const { signOut } = useAuth()
    const {
        save,
        setDialogCardOpen,
        loja,
        dialogCardOpen,
    } = useLoja()

    return (
        <>
            <div className="relative z-10 flex-shrink-0 flex h-16 shadow ">
                <button
                    className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    onClick={() => props.setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 px-4 flex justify-between">
                    <div className="flex-1 flex">
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                            {({ open }) => (
                                <>
                                    <div>
                                        <Menu.Button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            <span className="sr-only">Open user menu</span>
                                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 dark:bg-warmGray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <Menu.Item>
                                                <a className="hover:bg-gray-200 dark:hover:bg-warmGray-900 block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer"
                                                    onClick={() => setDialogCardOpen(true)}>
                                                    Ajustes
                                                </a>
                                            </Menu.Item>

                                            <Menu.Item>
                                                <a className="hover:bg-gray-200 dark:hover:bg-warmGray-900 block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer"
                                                    onClick={() => setAlertModalOpen(true)}>
                                                    Sair
                                                </a>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>

            <FormModal open={dialogCardOpen} setOpen={setDialogCardOpen}>
                <Form saveAction={save} cancelAction={setDialogCardOpen} shop={loja} />
            </FormModal>

            <AlertModal title="Atenção" message="Deseja sair da aplicação?"
                confirmAction={signOut} open={alertModalopenOpen} setOpen={setAlertModalOpen}
            />
        </>
    )
}
