import { useEffect, useState } from "react"

export const cleanObject = (object) => {

    const isFalsy = (value) => {
        return value === 0 ? true : !value
    }
    const result = {...object}

    Object.keys(result).forEach((key)=>{
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback) => {
    useEffect(()=>{
        callback()
    },[])
}

export const useDebounce = (value,delay) => {
    const[debouncedVale,setDebouncedValue] = useState(value)
    useEffect(()=>{
        const timeout = setTimeout(()=>{setDebouncedValue(value)},delay)
        return ()=>{clearTimeout(timeout)}
    },[value,delay])
    return debouncedVale
}