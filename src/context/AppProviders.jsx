import { AuthProvider } from './AuthContext'
import { FlagProvider } from './FlagContext'
import { SettingProvider } from './SettingContext'

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <SettingProvider>
        <FlagProvider>
          {children}
        </FlagProvider>
      </SettingProvider>
    </AuthProvider>
  )
}
