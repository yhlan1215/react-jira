import { useLocation } from 'react-router-dom'

export const useProjectIdInUrl = () => {
  const locationArr = useLocation().pathname.split('/')
  const projectId = locationArr[2]
  return projectId
}
