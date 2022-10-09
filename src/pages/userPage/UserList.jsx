import { Divider, List } from 'antd'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons'
import { useUser } from '../../utils/useRequests'

const Container = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: left;
`

export function UserList() {
  const { getUsers } = useUser()
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    <Container>
      <List
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <UserOutlined style={{ marginRight: '1rem' }} />
            {item.name}
            <Divider />
          </List.Item>
        )}
      />
    </Container>
  )
}
