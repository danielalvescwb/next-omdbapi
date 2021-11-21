import { createContext, ReactNode, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { apiAuthClient } from '../services/apiAuthClient'

import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  User,
} from '../../types/auth'

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel
if (process.browser) {
  authChannel = new BroadcastChannel('auth')
  authChannel.onmessage = (message) => {
    switch (message.data) {
      case 'signOut':
        signOut()
        break
      case 'signIn':
        window.location.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`)
      default:
        break
    }
  }
}

export function signOut() {
  destroyCookie(undefined, 'next-omdbapi.token')
  destroyCookie(undefined, 'next-omdbapi.refreshToken')
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [messageAuthContext, setMessageAuthContext] = useState()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'next-omdbapi.token': token } = parseCookies()
    if (token) {
      apiAuthClient
        .get('/me')
        .then((response) => {
          const {
            email,
            permissions,
            roles,
            userName,
            avatar_url,
          } = response.data
          setUser({ email, permissions, roles, userName, avatar_url })
        })
        .catch((err) => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiAuthClient.post('sessions', {
        email,
        password,
      })

      const {
        token,
        refreshToken,
        permissions,
        roles,
        userName,
        avatar_url,
      } = response.data

      setCookie(undefined, 'next-omdbapi.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setCookie(undefined, 'next-omdbapi.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })

      setUser({
        email,
        permissions,
        roles,
        userName,
        avatar_url,
      })

      apiAuthClient.defaults.headers['Authorization'] = `Bearer ${token}`

      if (authChannel && authChannel.name === 'auth') {
        authChannel.postMessage('signIn')
      }
      Router.push('/dashboard')
    } catch (error) {
      if (error?.code === 'credentials.invalid') {
        setMessageAuthContext(error.message)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user,
        messageAuthContext,
        authChannel,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
