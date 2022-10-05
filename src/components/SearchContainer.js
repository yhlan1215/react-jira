import { Typography } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export function SearchContainer({ label, children }) {
  return (
    <Container>
      <Typography.Text style={{ width: '10rem' }}>{ `${label}:`}</Typography.Text>
      {children}
    </Container>
  )
}
