import React, { useState, useEffect, useContext } from 'react'
import { useUser } from '../utils/useRequests'

const SettingContext = React.createContext(undefined)
SettingContext.displayName = 'SettingContext'

export function SettingProvider({ children }) {
  const [users, setUsers] = useState([])
  const { getUsers } = useUser()

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SettingContext.Provider value={{ users }}>
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
