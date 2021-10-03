/* This example requires Tailwind CSS v2.0+ */
import Card from '@components/layout/card'
import { DotsVerticalIcon } from '@heroicons/react/solid'

const projects = [
    { name: 'Produtos', initials: 'P', href: '#', bgColor: 'bg-pink-600' },
    { name: 'Categorias', initials: 'C', href: '#', bgColor: 'bg-purple-600' },
    { name: 'Clientes', initials: 'C', href: '#', bgColor: 'bg-yellow-500' },
    { name: 'Pedidos', initials: 'P', href: '#', bgColor: 'bg-green-500' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CardsGrid() {
    return (
        <Card>
            <div className="px-4 py-5 sm:px-6">
                <ul className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {projects.map((project) => (
                        <li key={project.name} className="col-span-1 flex shadow-sm rounded-md">
                            <div
                                className={classNames(
                                    project.bgColor,
                                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                                )}
                            >
                                {project.initials}
                            </div>
                            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-gray-50 dark:bg-warmGray-900 dark:border-warmGray-900 rounded-r-md truncate">
                                <div className="flex-1 px-4 py-6 text-sm truncate">
                                    <a href={project.href} className="font-medium">
                                        {project.name}
                                    </a>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open options</span>
                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    )
}
