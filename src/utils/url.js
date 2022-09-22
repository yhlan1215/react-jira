import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cleanObject } from '.'

export const useUrlSearchParam = (keys) =>{

    const[searchParams,setSearchParams] = useSearchParams()

    return [
       useMemo(() => keys.reduce((prev, key) => {
        return {...prev, [key]: searchParams.get(key)}
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },{}),[searchParams]),
        (param)=>{
            const o = cleanObject({...Object.fromEntries(searchParams), ...param})
            return setSearchParams(o)
        }
    ]
}

export const useUrlProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlSearchParam(['projectCreate'])
    const open = setProjectCreate({projectCreate: true})
    const close = setProjectCreate({projectCreate: false})
    return {
        open,
        close,
        projectModalOpen: projectCreate === 'true'
    }
} 