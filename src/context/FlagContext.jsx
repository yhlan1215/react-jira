import React, { useState, useContext } from 'react'

const FlagContext = React.createContext(undefined)
FlagContext.displayName = 'FlagContext'

export function FlagProvider({ children }) {
  const [refreshKanbanScreenFlag, setRefreshKanbanScreenFlag] = useState(false)

  const refreshKanbanScreen = () => {
    setRefreshKanbanScreenFlag(!refreshKanbanScreenFlag)
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FlagContext.Provider value={{ refreshKanbanScreenFlag, refreshKanbanScreen }}>
      {children}
    </FlagContext.Provider>
  )
}

export const useFlag = () => {
  const context = useContext(FlagContext)
  return context
}
