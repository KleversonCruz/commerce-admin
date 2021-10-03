import Categoria from "@data/core/Categoria";
import { api } from "@data/services/api";

export async function GetAllRequest(lojaId: number): Promise<any> {
    var response = await api.get(`/Categoria/${lojaId}`)
    .then(response => {
        const json:any = response.data
        if (json) {
            return {
                data: json.map(categoria => (
                    Categoria.createObject(categoria)
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

export async function PostRequest(categoria: Categoria): Promise<any> {
    var data = JSON.stringify(categoria.toObject());

    var config = {
        headers: { 
          'Content-Type': 'application/json', 
        },
    };

    var response = await api.post('/Categoria', data, config)
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

export async function PutRequest(categoria: Categoria): Promise<any> {
    var data = JSON.stringify(categoria.toObject());
    console.log(data)
    var config = {
        headers: { 
          'Content-Type': 'application/json', 
        },
    };
    var response = await api.put(`/Categoria/${categoria.id}`, data, config)
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

export async function DeleteRequest(categoria: Categoria): Promise<any> {
    var response = await api.delete(`/Categoria/${categoria.id}`)
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