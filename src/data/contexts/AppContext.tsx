import Loja from "@data/core/Loja";
import { createContext, useEffect, useState } from "react";
import { GetOneRequest as getLojaRequest } from "@data/services/lojaServices";

type AppContextType = {
    themes;
    loja: Loja
    isLoading: boolean
    loadLoja: (lojaId: number) => Promise<void>
    changeIsLoading: (state: boolean) => void
}

export const AppContext = createContext({} as AppContextType)

const themes = [
    { name: 'emerald' },
    { name: 'pink' },
    { name: 'rose' },
    { name: 'fuchsia' },
    { name: 'red' },
    { name: 'orange' },
    { name: 'ambar' },
    { name: 'teal' },
    { name: 'sky' },
    { name: 'indigo' },
    { name: 'cyan' },
    { name: 'lime' },
];

export function AppProvider({ children }) {
    const [loja, setLoja] = useState<Loja | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function loadLoja(lojaId: number) {
        const lojaData = await getLojaRequest(lojaId).then(response => {
            return response?.data
        })
        setLoja(lojaData)
    }

    async function changeIsLoading(state: boolean) {
        setIsLoading(state)
    }

    return (
        <AppContext.Provider value={{ themes, loja, loadLoja, changeIsLoading, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}