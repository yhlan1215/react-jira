import { Button, Form, Input, message, Modal, Popconfirm, Select } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HighIcon, LowIcon, MediumIcon, TypeSelect, UserSelect } from '../../components'
import { useFlag } from '../../context'
import { clone } from '../../utils'
import { useKanban, useTask } from '../../utils/useRequests'
import { useProjectIdInUrl } from './utils'

const FootrContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: end;
  width: 100%;
`
const PriorityContainer = styled.span`
  margin-left: 2rem;
`

export function TaskModal({ task, onClose, isOpen }) {
  const projectId = useProjectIdInUrl()
  const { postTask, putTask, deleteTask } = useTask()
  const { getKanbans } = useKanban()
  const [kanbans, setKanbans] = useState([])
  const { refreshKanbanScreen } = useFlag()
  const formRef = useRef()
  const { t } = useTranslation()

  useEffect(() => {
    if (isOpen) {
      formRef.current.setFieldsValue(task)
      getKanbans(projectId).then(setKanbans)
    }
  }, [isOpen])

  const onSave = () => {
    formRef.current.validateFields()
      .then(async (formValue) => {
        const clonedTask = clone(formValue)
        if (!task.id) {
          await postTask({ ...clonedTask, projectId })
          message.success(t('common.newSuccess'))
        } else {
          await putTask(task.id, clonedTask)
          message.success(t('common.editSuccess'))
        }
        refreshKanbanScreen()
        onClose()
      })
  }
  const onDelete = async (taskId) => {
    await deleteTask(taskId)
    onClose()
    refreshKanbanScreen()
    message.success(t('common.deleteSuceess'))
  }

  return (
    <Modal
      title={t('kanban.newTask')}
      open={isOpen}
      onCancel={onClose}
      footer={(
        <FootrContainer>
          {task.id && (
          <div>
            <Popconfirm
              title={t('kanban.deleteTask')}
              okText={t('common.OK')}
              cancelText={t('common.cancel')}
              onConfirm={() => onDelete(task.id)}
            >
              <Button type="link" danger>{t('common.delete')}</Button>
            </Popconfirm>
          </div>
          )}
          <div>
            <Button style={{ marginRight: '1rem' }} onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button style={{ marginRight: '1rem' }} type="primary" htmlType="submit" onClick={onSave}>
              {t('common.save')}
            </Button>
          </div>
        </FootrContainer>
)}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        ref={formRef}
      >
        <Form.Item name="name" label={t('kanban.taskname')}>
          <Input
            type="text"
          />
        </Form.Item>
        <Form.Item name="type" label={t('common.type')}>
          <TypeSelect />
        </Form.Item>
        <Form.Item name="processorId" label={t('common.processor')}>
          <UserSelect
            firstOptionLabel={t('kanban.processorFirstOption')}
          />
        </Form.Item>
        <Form.Item name="priority" label={t('kanban.priority')}>
          <Select>
            <Select.Option value="high">
              <HighIcon />
              <PriorityContainer>{t('common.high')}</PriorityContainer>
            </Select.Option>
            <Select.Option value="medium">
              <MediumIcon />
              <PriorityContainer>{t('common.medium')}</PriorityContainer>
            </Select.Option>
            <Select.Option value="low">
              <LowIcon />
              <PriorityContainer>{t('common.low')}</PriorityContainer>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="point" label={t('kanban.point')}>
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item name="kanbanId" label={t('kanban.state')}>
          <Select>
            {kanbans.map((kanban) => (
              <Select.Option
                key={kanban.id}
                value={kanban.id}
              >{kanban.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
