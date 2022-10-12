import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { PlusSquareOutlined } from '@ant-design/icons'
import { DragDropContext } from 'react-beautiful-dnd'
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
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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
  const { putTask } = useTask()
  const [dropDisabledState, setDropDisabledState] = useState('')

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

  const onDragStart = (start) => {
    setDropDisabledState(start.source.droppableId)
  }

  const onDragEnd = async (a) => {
    setDropDisabledState('')
    if (!a.destination) {
      return
    }
    // const sourceKanban = shownKanbans.find((shownKanban) => shownKanban.id === a.source.droppableId)
    // const tempTask = sourceKanban.tasks.splice(a.source.index, 1)
    // const destinationKanban = shownKanbans.find((shownKanban) => shownKanban.id === a.destination.droppableId)
    // destinationKanban.tasks.splice(a.destination.index, 0, tempTask)
    const clonedTasks = clone(tasks)
    clonedTasks.find((task) => task.id === a.draggableId).kanbanId = a.destination.droppableId
    setTasks(clonedTasks)
    await putTask(a.draggableId, { kanbanId: a.destination.droppableId })
    getTasksFromServer()
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Container>
        <h2>{project?.name}{t('kanban.title')}</h2>
        <HeaderContainer>
          <SearchPanel />
          <Button
            type="primary"
            style={{ marginBottom: '1rem' }}
            onClick={onCreate}
          ><PlusSquareOutlined />{t('kanban.newTask')}
          </Button>
        </HeaderContainer>
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
          {shownKanbans?.map((shownKanban) => <KanbanColumn dropDisabledState={dropDisabledState} kanban={shownKanban} key={shownKanban.id} />)}
          <CreateKanban />
        </KanbanContainer>
      </Container>
    </DragDropContext>
  )
}
