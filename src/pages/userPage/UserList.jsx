import { Divider, List } from 'antd'
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons'
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
            <UserOutlined style={{ marginRight: '1rem' }} />
            {item.name}
            <Divider />
          </List.Item>
        )}
      />
    </Container>
  )
}
