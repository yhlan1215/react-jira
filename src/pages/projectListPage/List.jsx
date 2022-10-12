import { EllipsisOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Table, Button, message, Popconfirm, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Pin } from '../../components'
import { useSetting } from '../../context'
import { useProject } from '../../utils/useRequests'

export function List({ onPin, onProjectDeleted, onEdit, ...props }) {
  const { deleteProject, putProject } = useProject()
  const { users } = useSetting()
  const { t } = useTranslation()

  const onDelete = async (id) => {
    await deleteProject(id)
    onProjectDeleted()
    message.success(t('common.deleteSuccess'))
  }

  return (
    <div>
      <Table
        {...props}
        columns={[
          {
            key: 'pin',
            dataIndex: 'pin',
            width: '3rem',
            align: 'center',
            render: (value, project) => (
              <Pin
                checkd={value}
                onCheckdChange={() => {
                  onPin(project.id)
                  putProject(project.id, { pin: !value })
                }}
              />
            )
          },
          {
            align: 'center',
            key: 'name',
            title: <div>{t('common.name')}</div>,
            dataIndex: 'name',
            render: (value, project) => <Link to={`/projects/${project.id}/kanban`}>{value}</Link>
          },
          {
            align: 'center',
            key: 'organization',
            title: <div>{t('projectList.organization')}</div>,
            dataIndex: 'organization'
          },
          {
            align: 'center',
            key: 'personId',
            title: <div>{t('common.processor')}</div>,
            render: (name, project) => (
              <div>
                <Avatar src={users?.find((user) => user.id === project.personId)?.picture} style={{ marginRight: '1rem' }} />
                {users?.find((user) => user.id === project.personId)?.name || t('projectList.unKnown')}
              </div>
            ) },
          {
            align: 'center',
            key: 'action',
            title: <div>{t('common.action')}</div>,
            render: (value, project) => (
              <Dropdown overlay={(
                <Menu>
                  <Menu.Item key="edit">
                    <Button
                      type="link"
                      onClick={() => {
                        onEdit(project.id)
                      }}
                    >
                      <FormOutlined />{t('common.edit')}
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="delete">
                    <Popconfirm
                      title={t('projectList.deleteProject')}
                      okText={t('common.OK')}
                      cancelText={t('common.cancel')}
                      onConfirm={() => onDelete(project.id)}
                    >
                      <Button type="link"><DeleteOutlined />{t('common.delete')}</Button>
                    </Popconfirm>
                  </Menu.Item>
                </Menu>
                )}
              >
                <Button icon={<EllipsisOutlined />} shape="circle" />
              </Dropdown>
            )
          }
        ]}
      />
    </div>
  )
}
