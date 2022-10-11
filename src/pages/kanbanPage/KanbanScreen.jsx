import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { EditOutlined } from '@ant-design/icons'
import { useFlag } from '../../context'
import { clone, useDocumentTitle } from '../../utils'
import { useKanban, useProject, useTask } from '../../utils/useRequests'
import { CreateKanban } from './CreateKanban'
import { KanbanColumn } from './KanbanColumn'
import { SearchPanel } from './SearchPanel'
import { useProjectIdInUrl } from './utils'
import { useUrlSearchParam } from '../../utils/url'
import { TaskModal } from './TaskModal'

const Container = styled.div`
    padding: 3rem;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 100%;
`
const KanbanContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export function KanbanScreen() {
  const [tasks, setTasks] = useState(undefined)
  const [project, setProject] = useState(undefined)
  const { getTasks } = useTask()
  const [kanbans, setKanbans] = useState(undefined)
  const [shownKanbans, setShownKanbans] = useState(undefined)
  const { getKanbans } = useKanban()
  const projectId = useProjectIdInUrl()
  const [param] = useUrlSearchParam(['name', 'processorId', 'type'])
  useDocumentTitle('看板列表')
  const { refreshKanbanScreenFlag } = useFlag()
  const { getProject } = useProject()
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const { t } = useTranslation()

  const getKanbansFromServer = () => getKanbans(projectId)
    .then((data) => {
      data.forEach((kanban) => { kanban.key = kanban.id })
      setKanbans(data)
    })
  const getTasksFromServer = () => getTasks(projectId)
    .then((data) => {
      data.forEach((task) => { task.key = task.id })
      setTasks(data)
    })

  useEffect(() => {
    getProject(projectId).then(setProject)
  }, [])

  useEffect(() => {
    getKanbansFromServer()
    getTasksFromServer()
  }, [refreshKanbanScreenFlag])

  useEffect(() => {
    if (!tasks || !kanbans) {
      return
    }
    const tempKanbans = clone(kanbans)
    tempKanbans.forEach((kanban) => {
      kanban.tasks = []
      kanban.deletable = !tasks.some((task) => task.kanbanId === kanban.id)
    })

    let tempTasks = clone(tasks)

    if (param.name) {
      tempTasks = tempTasks.filter((tempTask) => tempTask.name.includes(param.name))
    }
    if (param.processorId) {
      tempTasks = tempTasks.filter((tempTask) => tempTask.processorId === param.processorId)
    }
    if (param.type) {
      tempTasks = tempTasks.filter((tempTask) => tempTask.type === param.type)
    }

    tempTasks.forEach((task) => {
      tempKanbans.find((kanban) => kanban.id === task.kanbanId).tasks.push(task)
    })
    setShownKanbans(tempKanbans)
  }, [kanbans, tasks, param])

  const onCreate = () => {
    setIsTaskModalOpen(true)
  }

  return (
    <Container>
      <h2>{project?.name}{t('kanban.title')}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <SearchPanel />
        <Button style={{ marginBottom: '1rem' }} onClick={onCreate}><EditOutlined />{t('kanban.newTask')}</Button>
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        task={{
          name: '',
          type: 'task',
          processorId: '',
          priority: '',
          point: '0',
          kanbanId: kanbans?.[0]?.id
        }}
        onClose={() => setIsTaskModalOpen(false)}
      />
      <KanbanContainer>
        {shownKanbans?.map((shownKanban) => <KanbanColumn kanban={shownKanban} key={shownKanban.id} />)}
        <CreateKanban />
      </KanbanContainer>
    </Container>
  )
}
