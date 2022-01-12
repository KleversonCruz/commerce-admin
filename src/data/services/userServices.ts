import User from "@data/core/identity/User";
import { UserSignIn } from "@data/core/identity/UserSignIn";
import { api } from "@data/services/api";

export async function signInRequest(user: UserSignIn): Promise<any> {
    var data = JSON.stringify({
        "password": user.password,
        "userName": user.userName
    });

    var response = await api.post('/user/login', data)
    .then(response => {
        const json: any = response.data
        return {
            token: json.token,
            userData: User.createObject(json.user)
        }
    })
    .catch(error => {
        console.log(error);
    });

    return response
}

export async function recoverUserInformation(): Promise<any>{
    
    var response = await api.get('/user')
    .then(response => {
        const json = response.data
        return {
            userData: User.createObject(json)
        }
    })
    .catch(error => {
        console.log(error);
    });
    
    return response
}
