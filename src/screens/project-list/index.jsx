import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "../../utils"
import { useHttp } from "../../utils/http"
import { List } from "./list"
import { SearchPanel } from "./search-panel"

export const ProjectListScreen = () => {
    
    const[param,setParam] = useState({
        name:'',
        personId:''
    })
    const[users,setUsers] = useState([])
    const[projects,setProjects] = useState([])
    const debouncedParam = useDebounce(param,1000)
    const client = useHttp()

    useMount(()=>{
        client('users').then(setUsers)
    })

    useEffect(()=>{
        client('projects',{data:cleanObject(debouncedParam)}).then(setProjects)
    },[debouncedParam])

    return<div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List projects={projects} users={users} />
    </div>
}