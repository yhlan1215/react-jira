import { Layout } from 'antd'
import { Header } from '../../pages'

export function MainLayout({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  )
}
