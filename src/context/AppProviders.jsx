import { AuthProvider } from './AuthContext'
import { SettingProvider } from './SettingContext'

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <SettingProvider>
        {children}
      </SettingProvider>
    </AuthProvider>
  )
}
