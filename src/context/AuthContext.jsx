import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useRequests'

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

export function AuthProvider({ children }) {
  const { login } = useAuth()
  const [user, setUser] = useState(undefined)
  const nav = useNavigate()

  useEffect(() => {
    const a = JSON.parse(localStorage.getItem('user'))
    setUser(a)
  }, [])

  const signIn = async ({ username, password }) => {
    const { user } = await login(username, password)
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    document.cookie = "jwt=''"
    nav('./login')
    localStorage.removeItem('user')
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
