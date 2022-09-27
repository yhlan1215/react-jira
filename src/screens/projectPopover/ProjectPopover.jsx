import { Button, List, Popover, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { useProjectModal } from '../../context/ProjectModalContext'
import { useProject } from '../../utils/useRequests'

export function ProjectPopover({ setIsMadalOpen }) {
  const { open } = useProjectModal()
  const { getProjects } = useProject()
  const [projects, setProjects] = useState([])
  const fn1 = async () => { setProjects(await getProjects()) }
  const pinProjects = projects.filter((project) => project.pin)

  useEffect(() => {
    fn1()
  }, [])

  const content = (
    <div>
      <Typography.Text type="secondary">收藏列表</Typography.Text>
      <List>
        {pinProjects.map((project) => <List.Item key={project.id}>{project.name}</List.Item>)}
      </List>
      <Button type="link" onClick={open}>
        新建项目
      </Button>
    </div>
  )

  return (
    <Popover content={content}>
      项目
    </Popover>
  )
}
