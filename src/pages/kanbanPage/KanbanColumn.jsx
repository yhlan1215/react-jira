import { Button, message, Popconfirm } from 'antd'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'
import { TaskCard } from './TaskCard'
import { useKanban } from '../../utils/useRequests'
import { useFlag } from '../../context'

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: #dcdfe7;
  min-width: 27rem;
  padding: 1rem;
  margin-right: 1.5rem;
`

export function KanbanColumn({ kanban }) {
  const { deleteKanban } = useKanban()
  const { refreshKanbanScreen } = useFlag()

  const onDelete = async () => {
    await deleteKanban(kanban.id)
    refreshKanbanScreen()
    message.success('删除看板成功')
  }

  return (
    <ColumnContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {kanban.name}
        <div>
          { kanban.deletable && (
          <Popconfirm
            title="确定要删除这个看板吗"
            okText="确定"
            cancelText="取消"
            onConfirm={() => onDelete(kanban.id)}
          >
            <Button type="link"><CloseOutlined /></Button>
          </Popconfirm>
          )}
        </div>
      </div>
      {kanban.tasks?.map((task) => (
        <TaskCard
          task={task}
        />
      ))}
    </ColumnContainer>
  )
}
