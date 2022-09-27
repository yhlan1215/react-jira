import { Card } from 'antd'
import { BugTwoTone, CarryOutTwoTone } from '@ant-design/icons'
import styled from 'styled-components'
import { CreateTask } from './CreateTask'
import { useProjectIdInUrl } from './utils'

export const ColumnContainer = styled.div`
  min-height: 71vh;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: #dcdfe7;
  min-width: 27rem;
  padding: 1rem 1rem 1rem 1rem;
  margin-right: 1.5rem;
`
const TaskCard = styled(Card)`
  height: 10rem;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

export function KanbanColumn({ kanban, shownTasks }) {
  const projectId = useProjectIdInUrl()
  const tasksOfProject = shownTasks?.filter((task) => task.projectId === projectId)
  const tasks = tasksOfProject?.filter((task) => task.kanbanId === kanban.id)

  return (
    <ColumnContainer>
      {kanban.name}
      {tasks?.map((task) => (
        <TaskCard key={task.id}>
          {task.type === 'task' ? <CarryOutTwoTone /> : <BugTwoTone />}
          {task.name}
        </TaskCard>
      ))}
      <CreateTask kanbanId={kanban.id} />
    </ColumnContainer>
  )
}
