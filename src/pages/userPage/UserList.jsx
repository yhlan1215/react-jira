import { Avatar, Button, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { useSetting } from '../../context/SettingContext'
import { useDocumentTitle } from '../../utils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: left;
`

export function UserList() {
  const { users } = useSetting()
  const { t } = useTranslation()
  useDocumentTitle('用户列表')

  return (
    <Container>
      <h2>{t('userList.title')}</h2>
      <Table
        dataSource={users}
        columns={[
          {
            title: t('common.name'),
            key: 'name',
            dataIndex: 'name',
            render: (value, user, index) => (
              <div>
                <Avatar size="large" src={user.picture} style={{ marginRight: '2rem' }} />{value}
              </div>
            )
          },
          {
            title: t('common.action'),
            key: 'action',
            render: () => <Button type="link" disabled><DeleteOutlined />{t('common.delete')}</Button>
          }
        ]}
      />
    </Container>
  )
}
