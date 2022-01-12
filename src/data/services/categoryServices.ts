import Category from "@data/core/Category";
import { api } from "@data/services/api";

export async function GetCategories(shopId: number, queryParams?: any) {
    const { page, name, limit } = queryParams || {};

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    
    var response = await api.get('/category', { params: { shopId, name, page, limit } })
        .then(response => {
            const json: any = response.data
            if (json) {
                return {
                    items: json.items.map(i => (
                        Category.createObject(i)
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

export async function AddCategory(category: Category) {
    var formData = CreateFormData(category);


    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    var response = await api.post('/category', formData, config)
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

export async function UpdateCategory(category: Category) {
    console.log(category)
    var formData = CreateFormData(category);

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    var response = await api.put(`/category/${category.id}`, formData, config)
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

export async function DeleteCategory(categoria: Category) {
    var response = await api.delete(`/category/${categoria.id}`)
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

function CreateFormData(category: Category) {
    const formData = new FormData();
    formData.append('Id', category.id as any);
    formData.append('Name', category.name);
    formData.append('Desc', category.desc);
    formData.append('ImageUrl', category.imageUrl);
    formData.append('ImageFile', category?.imageFile[0]);
    formData.append('IsActive', category.isActive as any);
    return formData;
}