import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useApp from '@data/hooks/UseApp'
import { api } from '@data/services/api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar(props) {
  const router = useRouter()
  const { shop } = useApp()

  return (
    <>
      <Transition.Root show={props.sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={props.sidebarOpen}
          onClose={props.setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-warmGray-800 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-100 dark:bg-warmGray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => props.setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                {shop?.imageUrl ? (
                  <img
                    className="h-8 w-auto"
                    src={`${api.defaults.baseURL}/images/${shop?.imageUrl}`}
                    alt="Workflow"
                  />
                ) : null}
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {props.navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a className={classNames(
                        router.pathname === item.href
                          ? 'bg-gray-200 dark:bg-warmGray-900 text-th-accent-medium'
                          : 'hover:bg-gray-200 dark:hover:bg-warmGray-900 hover:text-th-accent-medium text-gray-900 dark:text-gray-200',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      >
                        <item.icon
                          className={classNames(
                            router.pathname === item.href
                              ? 'text-th-accent-medium'
                              : 'group-hover:text-th-accent-medium',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-gray-100 dark:bg-warmGray-800">
            <div className="flex items-center flex-shrink-0 px-4">
              {shop?.imageUrl ? (
                <img
                  className="h-8 w-auto"
                  src={`${api.defaults.baseURL}/images/${shop?.imageUrl}`}
                  alt="Workflow"
                />
              ) : null}
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {props.navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a className={classNames(
                      router.pathname === item.href
                        ? 'bg-gray-200 dark:bg-warmGray-900 text-th-accent-medium'
                        : 'hover:bg-gray-200 dark:hover:bg-warmGray-900 hover:text-th-accent-medium',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    >
                      <item.icon
                        className={classNames(
                          router.pathname === item.href
                            ? 'text-th-accent-medium'
                            : 'group-hover:text-th-accent-medium',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
