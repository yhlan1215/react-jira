/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Card } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BugIcon, HighIcon, LowIcon, MediumIcon, TaskIcon } from '../../components'
import { useUser } from '../../utils/useRequests'
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

export function TaskCard({ task, onDelete }) {
  const [users, setUsers] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const { getUsers } = useUser()

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    <Container>
      <Card hoverable key={task.id}>
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
            <Avatar size="small" src={users.find((user) => user.id === task.processorId)?.picture} />
          </FooterContainer>
        </div>
      </Card>
      <TaskModal
        isOpen={editModalOpen}
        task={task}
        onClose={() => setEditModalOpen(false)}
      />
    </Container>
  )
}
