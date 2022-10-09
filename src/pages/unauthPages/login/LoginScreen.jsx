import { Button, Divider, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LongButton } from '../..'
import { useAuth } from '../../../context'

export function LoginScreen() {
  const { login } = useAuth()
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.currentTarget.elements[0].value
    const password = e.currentTarget.elements[1].value
    login({ username, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Divider />
      <LongButton htmlType="submit" type="primary">登录</LongButton>
      <Button onClick={() => { nav('/projects') }}>进入</Button>
    </Form>
  )
}
