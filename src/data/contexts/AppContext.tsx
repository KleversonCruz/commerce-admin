import Shop from "@data/core/Shop";
import { createContext, useEffect, useState } from "react";
import { GetShopById as getLojaRequest } from "@data/services/shopServices";
import { loja } from "src/pages/api/mock";

type AppContextType = {
    themes;
    shop: Shop
    isLoading: boolean
    loadShop: (shopId: number) => Promise<void>
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
    const dataMock: Shop = new Shop(
        loja.id,
        loja.cnpj,
        loja.name,
        loja.desc,
        loja.email,
        loja.brandImageUrl,
        null,
        loja.imageUrl,
        null,
        loja.colorTheme,
        [],
        [],
        []
    )

    const [shop, setShop] = useState<Shop | null>(dataMock)
    const [isLoading, setIsLoading] = useState(true)

    async function loadLoja(shopId: number) {
        // const data = await getLojaRequest(shopId).then(response => {
        //     return response?.data
        // })
        //setShop(data)
    }

    async function changeIsLoading(state: boolean) {
        setIsLoading(state)
    }

    return (
        <AppContext.Provider value={{ themes, shop: shop, loadShop: loadLoja, changeIsLoading, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}