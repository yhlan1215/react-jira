/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Card, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { BugIcon, HighIcon, LowIcon, MediumIcon, TaskIcon } from '../../components'
import { useSetting } from '../../context'
import { TaskModal } from './TaskModal'

const Container = styled.div`
  margin: 1rem 0.5rem 0 0.5rem;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`
const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
  justify-content: space-between;
`

export function TaskCard({ task, index }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const { users } = useSetting()
  const { t } = useTranslation()

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            hoverable
            key={task.id}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <a onClick={() => setEditModalOpen(true)}>
                {task.name}
              </a>
              <FooterContainer>
                <LeftContainer>
                  {task.type === 'bug'
                    ? <BugIcon /> : <TaskIcon /> }
                  {task.priority === 'high'
                    ? <HighIcon /> : task.priority === 'medium'
                      ? <MediumIcon /> : <LowIcon /> }
                  <div>{task.point}</div>
                </LeftContainer>
                <Tooltip
                  title={users.find((user) => user.id === task.processorId)?.name || t('kanban.processorFirstOption')}
                >
                  {task.processorId ? (
                    <Avatar
                      size="small"
                      src={users.find((user) => user.id === task.processorId)?.picture}
                    />
                  ) : <Avatar icon={<UserOutlined />} /> }
                </Tooltip>
              </FooterContainer>
            </div>
            { provided.placeHolder }
          </Card>
          <TaskModal
            isOpen={editModalOpen}
            task={task}
            onClose={() => setEditModalOpen(false)}
          />
        </Container>
      )}
    </Draggable>
  )
}
