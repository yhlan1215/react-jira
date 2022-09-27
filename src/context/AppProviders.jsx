import { AuthProvider } from './AuthContext'
import { ProjectModalProvider } from './ProjectModalContext'

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProjectModalProvider>
        {children}
      </ProjectModalProvider>
    </AuthProvider>
  )
}
