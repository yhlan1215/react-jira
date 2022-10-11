import { Avatar, Divider, List } from 'antd'
import styled from 'styled-components'
import { useSetting } from '../../context/SettingContext'

const Container = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: left;
`

export function UserList() {
  const { users } = useSetting()

  return (
    <Container>
      <List
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <Avatar size={64} src={item.picture} style={{ marginRight: '2rem' }} />
            {item.name}
            <Divider />
          </List.Item>
        )}
      />
    </Container>
  )
}
