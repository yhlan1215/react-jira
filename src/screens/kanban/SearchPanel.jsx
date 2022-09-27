import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useUser } from '../../utils/useRequests'

export function SearchPanel({ param, setParam }) {
  const { getUsers } = useUser()
  const [users, setUsers] = useState([])
  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder="任务名"
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              name: e.target.value
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId || ''}
          onChange={(value) => {
            setParam({
              personId: value
            })
          }}
        >
          <Select.Option value="">负责人</Select.Option>
          {
                    users?.map((user) => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.name}
                      </Select.Option>
                    ))
                }
        </Select>
      </Form.Item>
      <Form.Item>
        <Select
          value={param.type || ''}
          onChange={(value) => {
            setParam({
              type: value
            })
          }}
        >
          <Select.Option value="">类型</Select.Option>
          <Select.Option value="task">任务</Select.Option>
          <Select.Option value="bug">Bug</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button>清空筛选</Button>
      </Form.Item>
    </Form>
  )
}
