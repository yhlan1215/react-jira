import { useState } from "react"
import { useMountedRef } from "."

const defaultInitialState = {
    status: 'idle',
    data: null,
    error: null
}

export const useAsync = ( InitialState ) => {

    const [ state, setState ] = useState({
        ...defaultInitialState,
        ...InitialState
    })
    const mountedRef = useMountedRef()

    const setData = ( data ) => {
        setState({
            data,
            status: 'success',
            error: null
        })
    }
    const setError = ( error ) => {
        setState({
            error,
            status: 'error',
            data: null
        })
    }
    const run = ( promise ) => {
        if( !promise || !promise.then ){
            throw new Error( '请传入promise数据类型' )
        }
        setState({
            ...state,
            status: 'loading'
        })
        return promise
        .then(( data ) => {if( mountedRef )
            setData( data ) 
            return data
        })
        .catch(( error ) => setError( error ))
    }
    return{
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status ==='success',
        setData,
        setError,
        run,
        ...state
    }
}