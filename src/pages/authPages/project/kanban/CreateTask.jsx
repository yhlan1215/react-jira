import { Button, Card, Input } from 'antd'
import { useState } from 'react'
import { useTask } from '../../../../utils/useRequests'
import { useProjectIdInUrl } from './utils'

export function CreateTask({ kanbanId }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { postTask } = useTask()

  const submit = async () => {
    await postTask({ name, projectId, kanbanId })
    setIsOpen(false)
    setName('')
  }

  const toggle = () => setIsOpen(!isOpen)

  if (!isOpen) {
    return <Button type="link" onClick={toggle}>+创建事务</Button>
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做些什么"
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  )
}
