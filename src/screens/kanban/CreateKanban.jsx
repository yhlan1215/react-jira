import { Input } from 'antd'
import { useState } from 'react'
import { useKanban } from '../../utils/useRequests'
import { ColumnContainer } from './KanbanColumn'
import { useProjectIdInUrl } from './utils'

export function CreateKanban() {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { postKanban } = useKanban()

  const submit = async () => {
    await postKanban({ name, projectId })
    setName('')
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
