import styled from 'styled-components'
import { Button, Dropdown, Image, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TranslationOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import softwareLogo from '../../assets/jira.png'
import { useAuthContext, useSetting } from '../../context'

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
  const { logout, user } = useAuthContext()
  const [selectedKey, setSelectedKey] = useState('')
  const location = useLocation()
  const nav = useNavigate()
  const { language, setLanguage } = useSetting()
  const { t } = useTranslation()

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
        <Button type="link" onClick={() => { nav('/projects') }}>
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
            label: t('common.project')
          }, {
            key: 'users',
            label: t('common.user')
          }]}
          style={{ marginLeft: '4rem', width: '30rem' }}
          onClick={(item) => {
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
        <Dropdown
          placement="bottomRight"
          overlay={(
            <Menu selectedKeys={[language]} onClick={(e) => setLanguage(e.key)}>
              <Menu.Item key="en">{t('header.english')}</Menu.Item>
              <Menu.Item key="zh">{t('header.chinese')}</Menu.Item>
            </Menu>
          )}
        >
          <TranslationOutlined style={{ color: 'white', fontSize: '2.5rem', marginRight: '1rem' }} />
        </Dropdown>
        <Dropdown overlay={(
          <Menu>
            <Menu.Item key="logout">
              <Button type="link" onClick={logout}>{t('header.logout')}</Button>
            </Menu.Item>
          </Menu>
          )}
        >
          <Button type="link" onClick={(e) => e.preventDefault}>Hi,{user?.name}</Button>
        </Dropdown>
      </div>
    </Container>
  )
}
