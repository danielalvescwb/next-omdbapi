import { ReactNode, Dispatch, SetStateAction } from 'react'

export type User = {
  email: string
  id: number
  name: string
  avatar_url: string
}

export type SignInCredentials = {
  token: string
  refreshToken: string
  name: string
  avatar_url: string
  id: number
  email: string
}

export type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  setUser: Dispatch<SetStateAction<User>>
  isAuthenticated: boolean
  messageAuthContext: string
  authChannel: BroadcastChannel
}

export type AuthProviderProps = {
  children: ReactNode
}
