import Product from "@data/core/Product";
import { api } from "@data/services/api";

export async function GetProducts(shopId: number, queryParams?: any) {
    const { page, name, limit } = queryParams || {};

    var response = await api.get(`/product`, { params: { shopId, name, page, limit} })
        .then(response => {
            const json: any = response.data
            if (json) {
                return {
                    items: json.items.map(i => (
                        Product.createObject(i)
                    )),
                    pagination: {
                        currentPage: json.currentPage,
                        totalItems: json.totalItems,
                        totalPages: json.totalPages,
                        links: {
                            Prev: json.links?.Prev,
                            Next: json.links?.Next
                        }
                    }
                }
            }
            return {
                data: []
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function AddProduct(product: Product) {
    var formData = CreateFormData(product);

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    var response = await api.post(`/product`, formData, config)
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

export async function UpdateProduct(product: Product){
    var formData = CreateFormData(product);

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    var response = await api.put(`/product/${product.id}`, formData, config)
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

export async function DeleteProduct(product: Product) {
    var response = await api.delete(`/product/${product.id}`)
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

function CreateFormData(product: Product) {
    const formData = new FormData();
    formData.append('Id', product.id as any);
    formData.append('Name', product.name);
    formData.append('Desc', product.desc);
    formData.append('Price', product.price as any);
    formData.append('IsActive', product.isActive as any);
    formData.append('ImageUrl', product.imageUrl);
    formData.append('ImageFile', product?.imageFile[0]);
    formData.append('CategoryId', product.categoryId as any);
    return formData;
}