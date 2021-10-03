import Cliente from "@data/core/Cliente";
import { api } from "@data/services/api";

export async function GetAllRequest(lojaId: number): Promise<any> {
    var response = await api.get(`/cliente/loja/${lojaId}`)
        .then(response => {
            const json: any = response.data
            if (json) {
                console.log(json)
                return {
                    data: json.map(cliente => (
                        Cliente.createObject(cliente)
                    ))
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

export async function PostRequest(cliente: Cliente): Promise<any> {
    var data = JSON.stringify(cliente.toObject());

    var config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    var response = await api.post('/Cliente', data, config)
        .then(response => {
            if (response.status === 200) {
                return Promise.resolve()
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function PutRequest(cliente: Cliente): Promise<any> {
    var data = JSON.stringify(cliente.toObject());
    console.log(data)
    var config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    var response = await api.put(`/Cliente/${cliente.id}`, data, config)
        .then(response => {
            if (response.status === 200) {
                return Promise.resolve()
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}

export async function DeleteRequest(cliente: Cliente): Promise<any> {
    var response = await api.delete(`/Cliente/${cliente.id}`)
        .then(response => {
            if (response.status === 200) {
                return Promise.resolve()
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });

    return response
}