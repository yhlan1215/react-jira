import React, { useState } from "react"
import * as auth from '../auth-provider'
import { useMount } from "../utils"

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

const bootstrapUser = async() => {
    let user = null
    const token = auth.getToken()
    if(token){
        const data = await fetch('me',{token})
        user = data.user
    }
    return user
}

export const AuthProvider = ({children}) => {

    const[user,setUser] = useState(null)

    useMount(()=>{
        bootstrapUser().then(setUser)
    })

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
