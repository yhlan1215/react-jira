import { Layout } from 'antd'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../../layouts'
import { ProjectListScreen, ProjectScreen, UserList } from '../../screens'

const Container = styled(Layout)`
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`
const Main = styled(Layout.Content)`
    height: 100%;
    padding: 2.5rem 2.5rem 2.5rem 2.5rem;
`

export function AuthenticatedApp() {
  return (
    <Container>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Main>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Main>
    </Container>
  )
}
