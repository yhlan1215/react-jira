import { createContext, useContext, useRef, useState } from 'react'
import { useProject } from '../utils/useRequests'

const ProjectModalContext = createContext(undefined)

export function ProjectModalProvider({ children }) {
  const { getProject } = useProject()
  const project = useRef()
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const close = () => setIsProjectModalOpen(false)
  const open = () => setIsProjectModalOpen(true)
  const openOriginal = async (id) => {
    project.current?.setFieldsValue(await getProject(id))
    setIsProjectModalOpen(true)
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ProjectModalContext.Provider value={{ isProjectModalOpen, close, open, openOriginal, project }}>
      {children}
    </ProjectModalContext.Provider>
  )
}

export const useProjectModal = () => {
  const context = useContext(ProjectModalContext)
  if (!context) {
    throw new Error('useProjectModal必须在ProjectModalProvider里使用')
  }
  return context
}
