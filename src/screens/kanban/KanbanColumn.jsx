import { Card } from 'antd'
import { BugTwoTone, CarryOutTwoTone } from '@ant-design/icons'
import styled from 'styled-components'
import { CreateTask } from './CreateTask'
import { useProjectIdInUrl } from './utils'

export const ColumnContainer = styled.div`
    height: 65vh;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: #dcdfe7;
    min-width: 27rem;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`

export function KanbanColumn({ kanban, allTasks }) {
  const projectId = useProjectIdInUrl()
  const tasksOfProject = allTasks?.filter((task) => task.projectId === projectId)
  const tasks = tasksOfProject?.filter((task) => task.kanbanId === kanban.id)

  return (
    <ColumnContainer>
      {kanban.name}
      {tasks?.map((task) => (
        <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
          {task.type === 'task' ? <CarryOutTwoTone /> : <BugTwoTone />}
          {task.name}
        </Card>
      ))}
      <CreateTask kanbanId={kanban.id} />
    </ColumnContainer>
  )
}
