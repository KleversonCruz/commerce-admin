import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

interface FormModalProps {
    open: boolean
    setOpen: (boolean) => void
    children: any
}

export default function FormModal(props: FormModalProps) {
    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.setOpen}>
                <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="hidden fixed inset-0 bg-warmGray-800 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                            <div className="w-full relative rounded-md flex pt-14 overflow-hidden shadow-2xl sm:pt-8
                                bg-gray-50 dark:bg-warmGray-900 text-gray-900 dark:text-gray-100
                            ">
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    className="absolute top-4 right-4 text-th-accent-medium hover:text-th-accent-dark sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-5 lg:right-8"
                                    onClick={() => props.setOpen(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                <div className="w-full gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}