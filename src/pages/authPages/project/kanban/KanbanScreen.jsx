import { Row } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { clone, useDocumentTitle } from '../../../../utils'
import { useUrlSearchParam } from '../../../../utils/url'
import { useKanban, useTask } from '../../../../utils/useRequests'
import { CreateKanban } from './CreateKanban'
import { KanbanColumn } from './KanbanColumn'
import { SearchPanel } from './SearchPanel'
import { useProjectIdInUrl, useProjectInUrl } from './utils'

const Container = styled.div`
    overflow: hidden;
    flex: 1;
`

export function KanbanScreen() {
  const [allTasks, setAllTasks] = useState([])
  const { getTasks } = useTask()
  const [allKanbans, setAllKanbans] = useState([])
  const project = useProjectInUrl()
  const { getKanbans } = useKanban()
  const projectId = useProjectIdInUrl()
  const [param] = useUrlSearchParam(['name', 'processorId', 'type'])
  const [shownTasks, setShownTasks] = useState([])
  useDocumentTitle('看板列表')

  useEffect(() => {
    getKanbans().then(setAllKanbans)
    getTasks().then(setAllTasks)
  }, [])

  useEffect(() => {
    if (!allTasks) {
      return
    }

    let tempTasks = clone(allTasks)

    if (param.name) {
      tempTasks = tempTasks.filter((tempTask) => tempTask.name.includes(param.name))
    }
    if (param.processorId) {
      tempTasks = tempTasks.filter((tempTask) => tempTask.processorId === param.processorId)
    }
    if (param.type) {
      tempTasks = tempTasks.filter((tempTask) => tempTask.type === param.type)
    }

    setShownTasks(tempTasks)
  }, [param, allTasks])

  const kanbans = allKanbans.filter((kanban) => kanban.projectId === projectId)

  return (
    <Container>
      <h2>{project?.name}看板</h2>
      <Row>
        <SearchPanel />
      </Row>
      <Row wrap={false}>
        {kanbans?.map((kanban) => <KanbanColumn shownTasks={shownTasks} kanban={kanban} key={kanban.id} />)}
        <CreateKanban />
      </Row>
    </Container>
  )
}
