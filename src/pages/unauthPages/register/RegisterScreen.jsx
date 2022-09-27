import { Form, Input } from 'antd'
import { useAuth } from '../../../context'
import { LongButton } from '../UnauthPages'

export function RegisterScreen() {
  const { register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.currentTarget.elements[0].value
    const password = e.currentTarget.elements[1].value
    register({ username, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={[{ required: true, message: '请确认密码' }, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error('密码确认不一致！'))
          }
        })
        ]}
        hasFeedback
      >
        <Input placeholder="请确认密码" type="password" id="confirm" />
      </Form.Item>
      <LongButton htmlType="submit" type="primary">注册</LongButton>
    </Form>
  )
}
