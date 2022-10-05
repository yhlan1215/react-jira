import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 1rem;
`

export function FilterBar({ children, onClear }) {
  const { t } = useTranslation()
  return (
    <Container>
      {children}
      <Button onClick={onClear}>{t('common.reset')}</Button>
    </Container>
  )
}
