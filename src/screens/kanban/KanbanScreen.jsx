import { Row } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDocumentTitle } from '../../utils'
import { useUrlSearchParam } from '../../utils/url'
import { useKanban, useTask } from '../../utils/useRequests'
import { CreateKanban } from './CreateKanban'
import { KanbanColumn } from './KanbanColumn'
import { SearchPanel } from './SearchPanel'
import { useProjectIdInUrl, useProjectInUrl } from './utils'

const Container = styled.div`
    overflow: hidden;
    flex: 1;
    ::-webkit-scrollbar{
        display: none;
    }
`

export function KanbanScreen() {
  const [allTasks, setAllTasks] = useState([])
  const { getTasks } = useTask()
  const [allKanbans, setAllKanbans] = useState([])
  const project = useProjectInUrl()
  const { getKanbans } = useKanban()
  const [param, setParam] = useUrlSearchParam(['name', 'type', 'processorId'])
  const projectId = useProjectIdInUrl()
  useDocumentTitle('看板列表')

  useEffect(() => {
    getKanbans().then(setAllKanbans)
  }, [])

  useEffect(() => {
    getTasks().then(setAllTasks)
  }, [])

  const kanbans = allKanbans.filter((kanban) => kanban.projectId === projectId)

  return (
    <Container>
      <h2>{project?.name}看板</h2>
      <Row>
        <SearchPanel param={param} setParam={setParam} />
      </Row>
      <Row wrap={false}>
        {kanbans?.map((kanban) => <KanbanColumn allTasks={allTasks} kanban={kanban} key={kanban.id} />)}
        <CreateKanban />
      </Row>
    </Container>
  )
}
