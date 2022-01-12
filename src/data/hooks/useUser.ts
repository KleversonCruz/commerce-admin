export default function useUser() {

    type SignInRequestData = {
        userName: string
        password: string
    }

    async function signInRequest(data: SignInRequestData) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": data.password,
            "userName": data.userName
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://localhost:5001/Usuario/Login", requestOptions)
            const json = await response.json();
            return json
        } catch (error) {
            console.log("error", error);
        }
    }

    return {
        signInRequest
    }
}