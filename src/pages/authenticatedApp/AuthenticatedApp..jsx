import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../../layouts'
import { ProjectListScreen, ProjectScreen } from '../../screens'

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr;
    grid-template-columns: 100vw;
    height: 100vh;
    grid-template-areas: 
    "header"
    "main";
`
const Main = styled.main`
    grid-area: main;
`

export function AuthenticatedApp() {
  return (
    <Container>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<ProjectListScreen />} />
          <Route path="/:projectId/*" element={<ProjectScreen />} />
        </Routes>
      </Main>
    </Container>
  )
}
