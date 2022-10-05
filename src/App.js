import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layouts'
import { UnauthPage, ProjectList, UserList, KanbanScreen } from './pages'

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<UnauthPage />}
        />
        <Route
          path="/projects"
          element={<MainLayout><ProjectList /></MainLayout>}
        />
        <Route
          path="/users"
          element={<MainLayout><UserList /></MainLayout>}
        />
        <Route
          path="/projects/:projectId/kanban"
          element={<MainLayout><KanbanScreen /></MainLayout>}
        />
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </div>
  )
}

export default App
