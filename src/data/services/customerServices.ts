import Customer from "@data/core/Customer";
import { api } from "@data/services/api";

export async function GetCustomers(shopId: number, queryParams?: any) {
    const { page, name, limit } = queryParams || {};

    var response = await api.get(`/Customer`, { params: { shopId, name, page, limit } })
        .then(response => {
            const json: any = response.data
            if (json) {
                console.log(json)
                return {
                    items: json.items.map(i => (
                        Customer.createObject(i)
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

export async function AddCustomer(customer: Customer): Promise<any> {
    var formData = CreateFormData(customer);

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    var response = await api.post('/Customer', formData, config)
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

export async function UpdateCustomer(customer: Customer): Promise<any> {
    var formData = CreateFormData(customer);

    var config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    var response = await api.put(`/Customer/${customer.id}`, formData, config)
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

export async function DeleteRequest(customer: Customer): Promise<any> {
    var response = await api.delete(`/Customer/${customer.id}`)
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

function CreateFormData(customer: Customer) {
    const formData = new FormData();
    formData.append('Id', customer.id as any);
    formData.append('FirstName', customer.firstName);
    formData.append('LastName', customer.lastName);
    formData.append('Telephone', customer.telephone);
    formData.append('Email', customer.email);
    return formData;
}