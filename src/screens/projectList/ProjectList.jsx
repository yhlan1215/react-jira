import { Button, Row } from 'antd'
import { useState, useEffect } from 'react'
import { clone, useDocumentTitle } from '../../utils/index'
import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useProject } from '../../utils/useRequests'
import { ProjectModal } from '../projectModal'
import { useUrlSearchParam } from '../../utils/url'
import { ScreenContainer } from '../../components'

export function ProjectListScreen() {
  const { getProjects } = useProject()
  const [projects, setProjects] = useState([])
  const [shownProjects, setShownProjects] = useState([])
  const [param] = useUrlSearchParam(['name', 'personId'])
  useDocumentTitle('项目列表')
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')

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
      tempShownProjects = tempShownProjects.filter((project) => project.name.includes(param.name))
    }

    setShownProjects(tempShownProjects)
  }, [param, projects])

  const getProjectsFromServer = () => {
    getProjects().then((data) => {
      data.forEach((project) => { project.key = project.id })
      setProjects(data)
    })
  }

  const onPin = (id) => {
    const clonedProjects = clone(projects)
    const foundProject = clonedProjects.find((project) => project.id === id)
    foundProject.pin = !foundProject.pin
    setProjects(clonedProjects)
  }

  return (
    <ScreenContainer>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <Button onClick={() => {
          setSelectedId('')
          setProjectModalOpen(true)
        }}
        >新建项目
        </Button>
      </Row>
      <SearchPanel />
      <List
        dataSource={shownProjects}
        onPin={onPin}
        onEdit={(id) => {
          setSelectedId(id)
          setProjectModalOpen(true)
        }}
      />
      <ProjectModal id={selectedId} open={projectModalOpen} onClose={() => setProjectModalOpen(false)} onProjectSaved={getProjectsFromServer} />
    </ScreenContainer>
  )
}
