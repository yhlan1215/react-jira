import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useProject } from '../../utils/useRequests'

export const useProjectInUrl = () => {
  const [project, setProject] = useState([])
  const { getProject } = useProject()
  const projectId = useProjectIdInUrl()
  useEffect(() => {
    getProject(projectId).then(setProject)
  }, [])
  return project
}

export const useProjectIdInUrl = () => {
  const locationArr = useLocation().pathname.split('/')
  const projectId = locationArr[2]
  return projectId
}
