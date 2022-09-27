import { Button, Drawer, Form, Input, Select } from 'antd'
import styled from 'styled-components'
import { useProjectModal } from '../../context'

const Container = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function ProjectMOdal({ users }) {
  const { isProjectModalOpen, close, project } = useProjectModal()

  return (
    <Drawer open={isProjectModalOpen} onClose={close} width="100%">
      <Container>
        <Form ref={project}>
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
            <Button type="primary" htmlType="submit">保存</Button>
            <Button>取消</Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  )
}
