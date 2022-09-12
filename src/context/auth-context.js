import React, { useState } from "react"
import * as auth from '../auth-provider'

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null)

    const login = (form) => auth.login(form).then(setUser)
    const register = (form) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider value={{user,login,register,logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context){
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
