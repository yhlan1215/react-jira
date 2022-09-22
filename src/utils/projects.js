import { useEffect } from "react"
import { cleanObject } from "."
import { useHttp } from "./http"
import { useAsync } from "./async"
// import { useQuery } from 'react-query'

export const useProjects = (param) => {

    const { run, ...result } = useAsync(param)
    const client = useHttp()

    // return useQuery(['projects',param], ()=>client('projects',{data:param}))

    useEffect(()=>{
        run(
            client('projects',{data:cleanObject(param)}))
          //eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])

    return result
}

export const useEditProject = () => {

    const { run, ...result } = useAsync()
    const client = useHttp()

    const edit = (param) => {
        return run(client(`projects/${param._id}`,{
            data: param,
            method: 'PATCH'}))
    }
    return {
        edit,
        ...result
    }
}

export const useAddProject = () => {

    const { run, ...result } = useAsync()
    const client = useHttp()

    const add = (param) => {
        return run(client('projects',{
            data: param,
            method: 'POST'}))
    }

    return {
        add,
        ...result
    }
}

export const useDeleteProject = () => {

    const { run, ...result } = useAsync()
    const client = useHttp()

    const deleteProject = (param) => {
        return run(client(`projects/${param._id}`,{
            method: 'DELETE'}))
    }
    return {
        deleteProject,
        ...result
    }
}
