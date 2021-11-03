import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
    const { 'admin.auth.token': token } = parseCookies()

    const api = axios.create({
        baseURL: 'https://kwcruz.com.br'
    })

    api.defaults.headers['Content-Type'] = 'application/json'

    api.interceptors.request.use(config => {
        console.log(config);

        return config;
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api;
}