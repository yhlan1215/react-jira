import { Dropdown, Menu, Table, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useProjectModal } from '../../context'
import { useProject } from '../../utils/useRequests'
import { Pin } from '../../components'

export function List({ users, ...props }) {
  const { openOriginal } = useProjectModal()
  const { deleteProject, putProject } = useProject()

  return (
    <div>
      <Table
        {...props}
        columns={[
          {
            key: 'pin',
            title: <Pin checkd disabled />,
            dataIndex: 'pin',
            render: (value, project) => <Pin checkd={value} onCheckdChange={() => putProject(project.id, { pin: !value })} />
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
            render: (name, project) => <div>{users?.find((user) => user.id === project.personId)?.name || '未知'}</div>
          },
          {
            key: 'action',
            title: 'action',
            render: (value, project) => (
              <Dropdown overlay={(
                <Menu>
                  <Menu.Item key="edit"><Button type="link" onClick={() => openOriginal(project.id)}>编辑</Button></Menu.Item>
                  <Menu.Item key="delete"><Button type="link" onClick={() => deleteProject(project.id)}>删除</Button></Menu.Item>
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
