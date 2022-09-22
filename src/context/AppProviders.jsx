import { AuthProvider } from './AuthContext'
import { ProjectModalProvider } from './ProjectModalContext'

export const AppProviders = ({children}) => {
    return<AuthProvider>
        <ProjectModalProvider>
            {children}
        </ProjectModalProvider>
    </AuthProvider>
}