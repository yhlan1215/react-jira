import { useEffect, useRef, useState } from "react"

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
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

export const resetRoute = () => window.location.href = window.location.origin

export const useDocumentTitle = (title) => {
    useEffect(()=>{
        document.title = title
    },[title])
}

export const useMountedRef = () => {
    
    const mountedRef = useRef(false)
    
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false}
    },[])
    return mountedRef
}