import { Form, Input, Select } from 'antd'

export function SearchPanel({ param, setParam, users, isloading }) {
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder="项目名"
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
          loading={isloading}
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
    </Form>
  )
}
