import styled from 'styled-components'
import { Button, Dropdown, Image, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import softwareLogo from '../../../assets/jira.png'
import { useAuth } from '../../../context'
import { resetRoute } from '../../../utils'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3.2rem;
`
const HeaderLeft = styled.div`
    display: flex;
    height: 100%;
`

export function Header() {
  const { logout, user } = useAuth()
  const [selectedKey, setSelectedKey] = useState('')
  const location = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (location.pathname.includes('/projects')) {
      setSelectedKey('projects')
    } else if (location.pathname.includes('/users')) {
      setSelectedKey('users')
    }
  }, [location])

  return (
    <Container>
      <HeaderLeft>
        <Button type="link" onClick={resetRoute}>
          <Image
            src={softwareLogo}
            height="5rem"
            width="5rem"
            preview={false}
          />
        </Button>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={[{
            key: 'projects',
            label: '项目'
          }, {
            key: 'users',
            label: '用户'
          }]}
          style={{ marginLeft: '4rem' }}
          onSelect={(item) => {
            switch (item.key) {
              case 'projects':
                nav('/projects')
                break
              case 'users':
              default:
                nav('/users')
                break
            }
          }}
        />
      </HeaderLeft>
      <div>
        <Dropdown overlay={(
          <Menu>
            <Menu.Item key="logout">
              <Button type="link" onClick={logout}>登出</Button>
            </Menu.Item>
          </Menu>
          )}
        >
          <Button type="link" onClick={(e) => e.preventDefault}>Hi,{user?.name}你猜</Button>
        </Dropdown>
      </div>
    </Container>
  )
}
