import QueryString from "qs"
import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "../../utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"

const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    
    const[param,setParam] = useState({
        name:'',
        personId:''
    })
    const[users,setUsers] = useState([])
    const[projects,setProjects] = useState([])
    const debouncedParam = useDebounce(param,1000)

    useMount(()=>{
        fetch(`${apiURL}/users`).then(async(response)=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    })

    useEffect(()=>{
        fetch(`${apiURL}/projects?${QueryString.stringify(cleanObject(debouncedParam))}`).then(async(response)=>{
            if(response.ok){
                setProjects(await response.json())
            }
        })
    },[debouncedParam])

    return<div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List projects={projects} users={users} />
    </div>
}