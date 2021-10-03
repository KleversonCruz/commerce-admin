import Loja from "@data/core/Loja";
import { api } from "@data/services/api";

export async function GetAllRequest(): Promise<any> {
    var response = await api.get(`/Loja/`)
    .then(response => {
        const json: any = response.data
        if (json) {
            return {
                data: json.map(loja => (
                    Loja.createObject(loja)
                ))
            }
        }
        return{
            data: null
        }
    })
    .catch(error => {
        console.log(error);
        throw new Error(error);
    });

    return response
}

export async function GetOneRequest(lojaId: number): Promise<any> {
    var response = await api.get(`/Loja/${lojaId}`)
    .then(response => {
        const json = response.data
        if (json) {
            return {
                data: Loja.createObject(json)
            }
        }
        return{
            data: null
        }
    })
    .catch(error => {
        console.log(error);
        throw new Error(error);
    });

    return response
}

export async function PostRequest(loja: Loja): Promise<any> {
    var data = JSON.stringify(loja.toObject());

    var config = {
        headers: { 
          'Content-Type': 'application/json', 
        },
    };

    var response = await api.post('/Loja', data, config)
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

export async function PutRequest(loja: Loja): Promise<any> {
    var data = JSON.stringify(loja.toObject());
    var config = {
        headers: { 
          'Content-Type': 'application/json', 
        },
    };
    var response = await api.put(`/Loja/${loja.id}`, data, config)
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
