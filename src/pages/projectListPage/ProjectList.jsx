import { Button, Row } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { ProjectModal } from './ProjectModal'
import { useProject } from '../../utils/useRequests'
import { useUrlSearchParam } from '../../utils/url'
import { clone, useDocumentTitle } from '../../utils'

export function ProjectList() {
  const { getProjects } = useProject()
  const [projects, setProjects] = useState([])
  const [shownProjects, setShownProjects] = useState([])
  const [param] = useUrlSearchParam(['name', 'personId'])
  useDocumentTitle('项目列表')
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    getProjectsFromServer()
  }, [])

  useEffect(() => {
    if (!projects.length) {
      return
    }

    let tempShownProjects = clone(projects)

    if (param.personId) {
      tempShownProjects = tempShownProjects.filter((project) => project.personId === param.personId)
    }

    if (param.name) {
      tempShownProjects = tempShownProjects.filter((project) => project.name.toLowerCase().includes(param.name.toLowerCase()))
    }

    setShownProjects(tempShownProjects)
  }, [param, projects])

  const getProjectsFromServer = () => {
    getProjects().then((data) => {
      data.forEach((project) => { project.key = project.id })
      setProjects(data)
    })
  }
  const onEdit = (id) => {
    setSelectedId(id)
    setProjectModalOpen(true)
  }

  const onPin = (id) => {
    const clonedProjects = clone(projects)
    const foundProject = clonedProjects.find((project) => project.id === id)
    foundProject.pin = !foundProject.pin
    setProjects(clonedProjects)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('projectList.title')}</h1>
      <Row justify="space-between" align="bottom">
        <SearchPanel />
        <Button
          onClick={() => {
            setSelectedId('')
            setProjectModalOpen(true)
          }}
          style={{ marginBottom: '1rem' }}
        >{t('projectList.createProject')}
        </Button>
      </Row>
      <List
        dataSource={shownProjects}
        onPin={onPin}
        onEdit={onEdit}
        onProjectDeleted={getProjectsFromServer}
      />
      <ProjectModal
        id={selectedId}
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onProjectSaved={getProjectsFromServer}
      />
    </div>
  )
}
