import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "@data/services/userServices";
import User from "@data/core/identity/User";
import { UserSignIn } from "@data/core/identity/UserSignIn";
import { api } from "@data/services/api";
import useApp from "@data/hooks/UseApp";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: UserSignIn) => Promise<any>
  signOut: () => Promise<void>
  destroySession: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const { loadShop: loadLoja, changeIsLoading } = useApp()

  const roleRequired = 'loja'
  const isAuthenticated = !!user;


  async function signIn({ userName, password }: UserSignIn) {
    try {
      changeIsLoading(true)

      const { token, userData } = await signInRequest({ userName, password }).then(response => {
        return response
      })

      if (userData.userRoles[0].role.name == roleRequired) {
        setCookie(undefined, 'admin.auth.token', token, {
          maxAge: 3600 * 24 * 7 // 7 days
        })
        configureSession(token)
        Router.push('/');
      }
      else {
        return {
          message: "Não autorizado"
        }
      }
    }
    catch (error) {
      return {
        message: "Houve um erro ao realizar o login"
      }
    }
    finally {
      changeIsLoading(false)
    }
  }

  async function signOut() {
    await destroySession()
    Router.push('/autenticacao');
  }

  async function configureSession(token: string) {
    try {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      const userData = await recoverUserInformation().then(response => {
        return response?.userData
      })
      setUser(userData)
      await loadLoja(userData?.shopId)
    }
    catch (error) {
      return {
        message: `Houve um erro: ${error.message}`
      }
    }
  }

  async function destroySession() {
    setUser(null)
    destroyCookie(null, 'admin.auth.token')
  }

  useEffect(() => {
    const { 'admin.auth.token': token } = parseCookies()
    //for test only
    signIn({ userName: '1', password: '1' })
    if (token) {
      configureSession(token)
    } else {
      destroySession()
      Router.push('/autenticacao');
    }
    changeIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, destroySession }}>
      {children}
    </AuthContext.Provider>
  )
}