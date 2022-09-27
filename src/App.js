import { Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthenticatedApp, UnauthenticatedApp } from './pages'
// import { useAuth } from './context/auth-context';

function App() {
  // const {user} = useAuth()

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<UnauthenticatedApp />} />
        <Route path="/*" element={<AuthenticatedApp />} />
      </Routes>
    </div>
  )
}

export default App
