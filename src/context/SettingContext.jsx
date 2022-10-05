import React, { useState, useEffect, useContext } from 'react'
import i18n from '../i18n/configs'
import { useUser } from '../utils/useRequests'

const SettingContext = React.createContext(undefined)
SettingContext.displayName = 'SettingContext'

export function SettingProvider({ children }) {
  const [users, setUsers] = useState([])
  const { getUsers } = useUser()
  const [language, setLanguage] = useState('')

  useEffect(() => {
    getUsers().then(setUsers)
    setLanguage(localStorage.getItem('language') || 'zh')
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language)
    i18n.changeLanguage(language)
  }, [language])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SettingContext.Provider value={{ users, language, setLanguage }}>
      {children}
    </SettingContext.Provider>
  )
}

export const useSetting = () => {
  const context = useContext(SettingContext)
  if (!context) {
    throw new Error('useSetting必须在SettingProvider里使用')
  }
  return context
}
