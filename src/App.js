import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { UnauthPage, AuthPage } from './pages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<UnauthPage />} />
        <Route path="/*" element={<AuthPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
