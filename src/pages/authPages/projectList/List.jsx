import { Dropdown, Menu, Table, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { Pin } from '../../../components'
import { useSetting } from '../../../context'
import { useProject } from '../../../utils/useRequests'

export function List({ onPin, onProjectDeleted, onEdit, ...props }) {
  const { deleteProject, putProject } = useProject()
  const { users } = useSetting()

  const onDelete = async (id) => {
    await deleteProject(id)
    onProjectDeleted()
    message.success('删除成功')
  }

  return (
    <div>
      <Table
        {...props}
        columns={[
          {
            key: 'pin',
            title: <Pin checkd disabled />,
            dataIndex: 'pin',
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
            key: 'name',
            title: '名称',
            dataIndex: 'name',
            render: (value, project) => <Link to={project.id}>{value}</Link>
          },
          {
            key: 'organization',
            title: '部门',
            dataIndex: 'organization'
          },
          {
            key: 'personId',
            title: '负责人',
            render: (name, project) => (
              <div>
                {users?.find((user) => user.id === project.personId)?.name || '未知'}
              </div>
            ) },
          {
            key: 'action',
            title: 'action',
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
                      编辑
                    </Button>
                  </Menu.Item>
                  <Menu.Item key="delete">
                    <Button
                      type="link"
                      onClick={() => onDelete(project.id)}
                    >删除
                    </Button>
                  </Menu.Item>
                </Menu>
                )}
              >
                <Button type="link">...</Button>
              </Dropdown>
            )
          }
        ]}
      />
    </div>
  )
}
