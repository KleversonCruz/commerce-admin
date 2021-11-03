import Shop from "@data/core/Shop";
import { api } from "@data/services/api";

export async function GetShops(name?: string, limit?: number, page?: number): Promise<any> {
    var response = await api.get('/Shop', { params: { name, limit, page } })
        .then(response => {
            const json: any = response.data
            if (json) {
                return {
                    data: json.items.map(s => (
                        Shop.createObject(s)
                    ))
                }
            }
            return {
                data: null
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function GetShopById(shopId: number) {
    var response = await api.get(`/Shop/${shopId}`)
        .then(response => {
            const json = response.data
            if (json) {
                return {
                    data: Shop.createObject(json)
                }
            }
            return {
                data: null
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function AddShop(shop: Shop) {
    var formData = CreateFormData(shop);

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    var response = await api.post('/Shop', formData, config)
        .then(response => {
            if (response.status === 200) {
                return response.status
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function UpdateShop(shop: Shop) {
    console.log(shop)
    var formData = CreateFormData(shop);

    var config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    var response = await api.put(`/Shop/${shop.id}`, formData, config)
        .then(response => {
            if (response.status === 200) {
                return response.status
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

function CreateFormData(shop: Shop) {
    const formData = new FormData();
    formData.append('Id', shop.id as any);
    formData.append('Name', shop.name);
    formData.append('Cnpj', shop.cnpj);
    formData.append('Desc', shop.desc);
    formData.append('Email', shop.email);
    formData.append('BrandImageUrl', shop.brandImageUrl);
    formData.append('BrandImageFile', shop?.brandImageFile[0]);
    formData.append('ImageUrl', shop.imageUrl);
    formData.append('ColorTheme', shop.colorTheme);
    return formData;
}

