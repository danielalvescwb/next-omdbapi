import { ReactNode } from 'react'

export type User = {
  email: string
  permissions: string[]
  roles: string[]
  userName: string
  avatar_url: string
}

export type SignInCredentials = {
  email: string
  password: string
}

export type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  isAuthenticated: boolean
  messageAuthContext: string
  authChannel: BroadcastChannel
}

export type AuthProviderProps = {
  children: ReactNode
}
