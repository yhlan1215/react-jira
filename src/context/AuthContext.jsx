import { message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useRequests'

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

export function AuthProvider({ children }) {
  const { login } = useAuth()
  const [user, setUser] = useState(undefined)
  const nav = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  const signIn = async ({ username, password }) => {
    const { user } = await login(username, password)
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    message.success(t('loginPage.loginSuccessfully'))
  }

  const logout = () => {
    document.cookie = 'jwt=; Max-Age=-99999999;'
    nav('./login')
    localStorage.removeItem('user')
    message.success(t('loginPage.LoggingOutSuccessfully'))
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
