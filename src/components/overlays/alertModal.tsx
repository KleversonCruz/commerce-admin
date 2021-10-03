import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import SecondaryButton from '@components/elements/buttons/secondaryButton'
import PrimaryButton from '@components/elements/buttons/primaryButton'

interface AlertModalProps {
  open: boolean
  message: string
  title: string
  setOpen: (boolean) => void
  confirmAction?: () => any
  cancelAction?: () => any
}

export default function AlertModal(props: AlertModalProps) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={props.open}
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-warmGray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
              bg-gray-50 dark:bg-warmGray-900 text-gray-900 dark:text-gray-100"
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm">
                      {props.message}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <PrimaryButton
                  type="button"
                  className="w-full justify-center sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => { props.confirmAction(), props.setOpen(false) }}
                >
                  Confirmar
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  className="mt-3 sm:mt-0 w-full justify-center sm:ml-3 sm:w-auto sm:text-sm border"
                  onClick={() => props.setOpen(false)}
                >
                  Cancelar
                </SecondaryButton>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
