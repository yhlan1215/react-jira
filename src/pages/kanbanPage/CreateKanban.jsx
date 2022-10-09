import { Input, message } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFlag } from '../../context'
import { useKanban } from '../../utils/useRequests'
import { ColumnContainer } from './KanbanColumn'
import { useProjectIdInUrl } from './utils'

export function CreateKanban() {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { postKanban } = useKanban()
  const { refreshKanbanScreen } = useFlag()
  const { t } = useTranslation()

  const submit = async () => {
    await postKanban({ name, projectId })
    setName('')
    refreshKanbanScreen()
    message.success(t('common.newSucess'))
  }

  return (
    <ColumnContainer>
      <Input
        size="large"
        placeholder={t('kanban.newKanban')}
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </ColumnContainer>
  )
}
