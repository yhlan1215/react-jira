import { Button, Form, Input, message, Modal } from 'antd'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { UserSelect } from '../../components'
import { clone } from '../../utils'
import { useProject } from '../../utils/useRequests'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export function ProjectModal({ id, open, onClose, onProjectSaved }) {
  const { t } = useTranslation()
  const { getProject, postProject, putProject } = useProject()
  const formRef = useRef()
  const onSave = () => {
    formRef.current.validateFields()
      .then(async (project) => {
        const clonedProject = clone(project)
        if (!id) {
          await postProject({ ...clonedProject, pin: false })
          onProjectSaved()
          onClose()
          message.success(t('projectList.newSuccesss'))
        } else {
          await putProject(id, clonedProject)
          onProjectSaved()
          onClose()
          message.success(t('projectList.editSuccess'))
        }
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
    <Modal
      open={open}
      onCancel={onClose}
      footer={(
        <div>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button style={{ marginRight: '1rem' }} type="primary" htmlType="submit" onClick={onSave}>
            {id ? t('common.save') : t('common.create')}
          </Button>
        </div>
      )}
      title={id ? t('projectList.modalEditHeader') : t('projectList.createProject')}
    >
      <Container>
        <Form
          labelCol={{ span: 9 }}
          ref={formRef}
        >
          <Form.Item
            label={t('projectList.name')}
            name="name"
            rules={[{ required: true, message: t('projectList.nameWarning') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('projectList.organization')}
            name="organization"
            rules={[{ required: true, message: t('projectList.organizationWarning') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('projectList.processor')}
            name="personId"
          >
            <UserSelect />
          </Form.Item>
        </Form>
      </Container>
    </Modal>
  )
}
