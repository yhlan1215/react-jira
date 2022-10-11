import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Divider, Form, Input, message } from 'antd'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { LongButton } from '../..'
import { useAuthContext } from '../../../context'

export function LoginScreen() {
  const formRef = useRef()
  const nav = useNavigate()
  const { signIn } = useAuthContext()
  const { t } = useTranslation()
  const { hash } = useLocation()

  useEffect(() => {
    formRef.current.setFieldsValue({
      username: '',
      password: ''
    })
    if (hash === '#sessionTimeout') {
      localStorage.removeItem('user')
      message.error(t('loginPage.loginAgain'))
    }
  }, [])

  const handleSubmit = () => {
    formRef.current.validateFields()
      .then(signIn)
      .then(() => nav('/projects'))
  }

  return (
    <Form
      ref={formRef}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: t('loginPage.userNameWarning') }]}
      >
        <Input
          onPressEnter={handleSubmit}
          prefix={<UserOutlined />}
          placeholder={t('loginPage.username')}
          type="text"
          id="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('loginPage.passwordWarning') }]}
      >
        <Input.Password
          onPressEnter={handleSubmit}
          prefix={<LockOutlined />}
          placeholder={t('loginPage.password')}
          id="password"
        />
      </Form.Item>
      <Divider />
      <LongButton
        onClick={handleSubmit}
        type="primary"
      >
        {t('loginPage.login')}
      </LongButton>
    </Form>
  )
}
