import { cleanObject, useMount } from "."
import { useHttp } from "./http"
import { useAsync } from "./async"

export const useUsers = (param) => {

    const { run, ...result } = useAsync(param)
    const client = useHttp()

    useMount(()=>{
        run(
            client('jiraUsers',{data:cleanObject(param)}))
          //eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return result
}