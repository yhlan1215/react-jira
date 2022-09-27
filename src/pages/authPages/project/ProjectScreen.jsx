import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import { KanbanScreen, EpicScreen } from '.'
import { ScreenContainer } from '../../../components'

const MainLayout = styled(Layout)`
    height: 100%;
`
const LayoutSider = styled(Layout.Sider)`
    background-color: white;
`
const LayoutContent = styled(Layout.Content)`
    height: 85vh;
    padding-left: 2.5rem;
`

export function ProjectScreen() {
  const locationArr = useLocation().pathname.split('/')
  const key = locationArr[locationArr.length - 1]

  return (
    <ScreenContainer>
      <MainLayout>
        <LayoutSider>
          <Menu selectedKeys={[key]}>
            <Menu.Item key="kanban">
              <Link to="kanban">看板</Link>
            </Menu.Item>
            <Menu.Item key="epic">
              <Link to="epic">任务组</Link>
            </Menu.Item>
          </Menu>
        </LayoutSider>
        <LayoutContent>
          <Routes>
            <Route path="/" element={<Navigate to="kanban" replace />} />
            <Route path="/kanban" element={<KanbanScreen />} />
            <Route path="/epic" element={<EpicScreen />} />
          </Routes>
        </LayoutContent>
      </MainLayout>
    </ScreenContainer>
  )
}
