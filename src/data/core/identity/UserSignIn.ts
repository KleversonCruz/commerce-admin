export interface UserSignIn {
    userName: string
    password: string
    roleRequired?: 'loja' | 'admin' | 'cliente'
}