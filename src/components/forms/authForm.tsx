import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import { AuthContext } from "@data/contexts/AuthContext";
import useNotify from "@data/hooks/useNotify";
import { useContext, useEffect } from "react";
import { useForm } from 'react-hook-form'

export default function Form() {
  const { notifyLoading, notifyLoadingUpdate } = useNotify()
  const { register, handleSubmit } = useForm()
  const { signIn, destroySession } = useContext(AuthContext)

  useEffect(destroySession, [])

  async function handleSignIn(data) {
    const toastId = notifyLoading('Por favor aguarde')
    await signIn(data).then(response => {
      response?.message ?
        notifyLoadingUpdate(toastId, response?.message, 'error')
        : notifyLoadingUpdate(toastId, 'Login realizado', 'success')
    })

  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8
      bg-gray-50 dark:bg-warmGray-900 text-gray-900 dark:text-trueGray-100"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">Entre com sua conta</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10
          bg-gray-100 dark:bg-warmGray-800"
        >
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <FormGroup register={register} id="userName" placeholder="Usuário teste: admin" label="Usuário" required />
            </div>

            <div>
              <FormGroup register={register} id="password" placeholder="Senha teste: 1234" label="Senha" required type="password" />
            </div>


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-mediumhover:text-gray-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <SecondaryButton
                type="submit"
                className="w-full flex justify-center py-2 px-4"
              >
                Entrar
              </SecondaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
