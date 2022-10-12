import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PlusSquareOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { ProjectModal } from './ProjectModal'
import { useProject } from '../../utils/useRequests'
import { useUrlSearchParam } from '../../utils/url'
import { clone, useDocumentTitle } from '../../utils'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

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
    <div style={{ padding: '3rem' }}>
      <h1>{t('projectList.title')}</h1>
      <Container>
        <SearchPanel />
        <Button
          type="primary"
          onClick={() => {
            setSelectedId('')
            setProjectModalOpen(true)
          }}
          style={{ marginBottom: '1rem' }}
        >
          <PlusSquareOutlined />{t('projectList.createProject')}
        </Button>
      </Container>
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
