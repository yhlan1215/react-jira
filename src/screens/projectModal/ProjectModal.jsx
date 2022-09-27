import { Button, Drawer, Form, Input, message, Select } from 'antd'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useSetting } from '../../context/SettingContext'
import { useProject } from '../../utils/useRequests'

const Container = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function ProjectModal({ id, open, onClose, onProjectSaved }) {
  const { users } = useSetting()
  const { getProject, postProject, putProject } = useProject()
  const formRef = useRef()
  const onSave = () => {
    formRef.current.validateFields()
      .then(async (project) => {
        const clonedProject = JSON.parse(JSON.stringify(project))
        if (!id) {
          await postProject({ ...clonedProject, pin: false })
          onProjectSaved()
          onClose()
        } else {
          await putProject(id, clonedProject)
          onProjectSaved()
          onClose()
        }
        message.success('保存成功')
      })
  }

  useEffect(() => {
    if (open) {
      if (id) {
        getProject(id).then(formRef.current.setFieldsValue)
      } else {
        formRef.current.setFieldsValue({
          id: '',
          name: '',
          organization: '',
          personId: ''
        })
      }
    }
  }, [id, open])

  return (
    <Drawer open={open} onClose={onClose} width="100%">
      <Container>
        <Form ref={formRef}>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入项目名' }]}>
            <Input placeholder="请输入项目名" />
          </Form.Item>
          <Form.Item label="部门" name="organization" rules={[{ required: true, message: '请输入部门名' }]}>
            <Input placeholder="请输入部门名" />
          </Form.Item>
          <Form.Item label="负责人" name="personId">
            <Select>
              {
                users?.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.name}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" onClick={onSave}>{id ? '保存' : '新建'}</Button>
            <Button onClick={onClose}>取消</Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  )
}
