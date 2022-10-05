import { Input, message } from 'antd'
import { useState } from 'react'
import { useFlag } from '../../context'
import { useKanban } from '../../utils/useRequests'
import { ColumnContainer } from './KanbanColumn'
import { useProjectIdInUrl } from './utils'

export function CreateKanban() {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { postKanban } = useKanban()
  const { refreshKanbanScreen } = useFlag()

  const submit = async () => {
    await postKanban({ name, projectId })
    setName('')
    refreshKanbanScreen()
    message.success('新建看板成功')
  }

  return (
    <ColumnContainer>
      <Input
        size="large"
        placeholder="新建看板名称"
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </ColumnContainer>
  )
}
