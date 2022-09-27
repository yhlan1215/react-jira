import { Button, Card, Divider } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { LoginScreen, RegisterScreen } from '../../screens'
import logo from '../../assets/logo.svg'
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'
import { useDocumentTitle } from '../../utils'

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  padding: 5rem 0;
  background-size: 10rem;
  width: 100%;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

export function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false)
  useDocumentTitle('jira任务管理系统')
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号' }
        </Button>
      </ShadowCard>
    </Container>
  )
}
