export default function Content404() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8
    bg-gray-50 dark:bg-warmGray-900 text-gray-900 dark:text-trueGray-100"
    >
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Página não encontrada</h1>
              <p className="mt-1 text-base">Você parece perdido, precisa de um mapa?</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <a
                href="\"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Voltar ao início
              </a>
              <a
                href="\"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Pegar o mapa
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
