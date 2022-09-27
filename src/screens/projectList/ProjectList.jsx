import { Button, Row } from 'antd'
import { useState, useEffect } from 'react'
import { useDocumentTitle } from '../../utils/index'
import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useUser, useProject } from '../../utils/useRequests'
import { ProjectMOdal } from '../projectModal'
import { useProjectModal } from '../../context/ProjectModalContext'
import { useUrlSearchParam } from '../../utils/url'
import { ScreenContainer } from '../../components'

export function ProjectListScreen() {
  const { getProjects } = useProject()
  const [projects, setProjects] = useState([])
  const { getUsers } = useUser()
  const [users, setUsers] = useState([])
  const { open } = useProjectModal()
  const [param, setParam] = useUrlSearchParam(['name', 'personId'])
  const [isLoading, setIsloading] = useState(false)
  useDocumentTitle('项目列表')

  useEffect(() => {
    getProjects().then(setProjects)
    getUsers().then(setUsers)
  }, [])
  useEffect(() => {
    setIsloading(!isLoading)
  }, [projects])

  return (
    <ScreenContainer>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <Button onClick={open}>新建项目</Button>
      </Row>
      <ProjectMOdal users={users} />
      <SearchPanel param={param} setParam={setParam} users={users} isloading={isLoading} />
      <List dataSource={projects} users={users} loading={isLoading} />
    </ScreenContainer>
  )
}
