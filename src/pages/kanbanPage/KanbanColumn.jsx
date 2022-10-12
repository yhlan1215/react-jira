import { Button, message, Popconfirm } from 'antd'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Droppable } from 'react-beautiful-dnd'
import { TaskCard } from './TaskCard'
import { useKanban } from '../../utils/useRequests'
import { useFlag } from '../../context'

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  min-width: 27rem;
  padding: 1rem;
  margin-right: 1.5rem;
  background-color: #dcdfe7;

  &.dropDisabled {
    outline: rgba(255, 0, 0, 0.4) 4px solid;
    background-color: lightpink;
  }

  &.droppable {
    outline: rgba(0, 0, 255, 0.3) 4px dashed;
    background-color: lightblue;
  }
`

export function KanbanColumn({ kanban, dropDisabledState }) {
  const { deleteKanban } = useKanban()
  const { refreshKanbanScreen } = useFlag()
  const { t } = useTranslation()

  const onDelete = async () => {
    await deleteKanban(kanban.id)
    refreshKanbanScreen()
    message.success(t('common.deleteSuccess'))
  }

  return (
    <Droppable isDropDisabled={kanban.id === dropDisabledState} droppableId={kanban.id}>
      {(provided) => (
        <ColumnContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={dropDisabledState && (kanban.id === dropDisabledState ? 'dropDisabled' : 'droppable')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {kanban.name}
            <div>
              { kanban.deletable && (
              <Popconfirm
                title={t('kanban.deleteKanban')}
                okText={t('common.OK')}
                cancelText={t('common.cancel')}
                onConfirm={() => onDelete(kanban.id)}
              >
                <Button type="link"><CloseOutlined /></Button>
              </Popconfirm>
              )}
            </div>
          </div>
          {kanban.tasks?.map((task, index) => (
            <TaskCard
              task={task}
              key={task.id}
              index={index}
            />
          ))}
          {provided.placeholder}
        </ColumnContainer>
      )}
    </Droppable>
  )
}
