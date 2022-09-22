import QueryString from "qs"
import * as auth from "../auth-provider"
import { useAuth } from "../context/AuthContext"

export const http = async(endpoint,{data,token,headers,...customConfig} = {}) => {

    const config = {
        method:'GET',
        headers:{
            Authorization: token ? `bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '' 
        },
        ...customConfig
    }

    if(config.method.toUpperCase() === 'GET'){
        endpoint+=`?${QueryString.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`http://localhost:8080/${endpoint}`,config)
    .then(async(res)=>{
        if(res.status === 401){
            await auth.logout()
            window.location.reload()
            return Promise.reject({message:'请重新登录'})
        }
        const data = await res.json()
        if(res.ok){
            return data
        }else{
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const {user} = useAuth()
    return(...[endpoint,config])=> http(endpoint,{...config,token:user?.token})
}