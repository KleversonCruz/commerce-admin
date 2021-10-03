import useAuth from "@data/hooks/UseAppAuth";
import Produto from "@data/core/Produto";
import { api } from "@data/services/api";

export async function GetAllRequest(lojaId: number): Promise<any> {
    var response = await api.get(`/Produto/${lojaId}`)
    .then(response => {
        const json: any = response.data
        if (json) {
            return {
                data: json.map(produto => (
                    Produto.createObject(produto)
                ))
            }
        }
        return{
            data: []
        }
    })
    .catch(error => {
        console.log(error);
        throw new Error(error);
    });

    return response
}

export async function PostRequest(produto: Produto): Promise<any> {
    var data = JSON.stringify(produto.toObject());

    var config = {
        headers: { 
          'Content-Type': 'application/json', 
        },
    };

    var response = await api.post('/Produto', data, config)
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

export async function PutRequest(produto: Produto): Promise<any> {
    var data = JSON.stringify(produto.toObject());
    var config = {
        headers: { 
          'Content-Type': 'application/json', 
        },
    };
    var response = await api.put(`/Produto/${produto.id}`, data, config)
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

export async function DeleteRequest(produto: Produto): Promise<any> {
    var response = await api.delete(`/Produto/${produto.id}`)
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