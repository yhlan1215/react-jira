import { createContext, useContext, useState } from "react";
import { useAsync } from "../utils/async";
import { useHttp } from "../utils/http";

const ProjectModalContext = createContext( undefined )

export const ProjectModalProvider = ({ children }) => {

    const [project, setProject] = useState([])
    const [ isProjectModalOpen, setIsProjectModalOpen ] = useState(false)
    const { run } = useAsync()
    const client = useHttp()
    const close = () => setIsProjectModalOpen(false)
    const open = () => setIsProjectModalOpen(true)
    const openOriginal = (id) => {const{data} = (run(client(`projects/${id}`)))
    setProject(data)
    setIsProjectModalOpen(true)}

    return<ProjectModalContext.Provider value={{isProjectModalOpen,close,open,openOriginal,project}}>
        {children}
    </ProjectModalContext.Provider>
}

export const useProjectModal = () => {
    const context = useContext(ProjectModalContext)
    if(!context){
        throw new Error('useProjectModal必须在ProjectModalProvider里使用')
    }
    return context
}