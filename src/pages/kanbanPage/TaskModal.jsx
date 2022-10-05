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
  justify-content: space-between;
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
          message.success('新建成功')
        } else {
          await putTask(task.id, clonedTask)
          message.success('编辑成功')
        }
        refreshKanbanScreen()
        onClose()
      })
  }
  const onDelete = async (taskId) => {
    await deleteTask(taskId)
    onClose()
    refreshKanbanScreen()
    message.success('删除任务成功')
  }

  return (
    <Modal
      title="创建事务"
      open={isOpen}
      onCancel={onClose}
      footer={(
        <FootrContainer>
          <div>
            <Popconfirm
              title="确定要删除这个任务吗"
              okText="确定"
              cancelText="取消"
              onConfirm={() => onDelete(task.id)}
            >
              <Button type="link" danger>{t('common.delete')}</Button>
            </Popconfirm>
          </div>
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
        <Form.Item name="name" label="任务名">
          <Input
            type="text"
            placeholder="需要做些什么"
          />
        </Form.Item>
        <Form.Item name="type" label="类型">
          <TypeSelect />
        </Form.Item>
        <Form.Item name="processorId" label="负责人">
          <UserSelect
            firstOptionLabel="无负责人"
          />
        </Form.Item>
        <Form.Item name="priority" label="优先级">
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
        <Form.Item name="point" label="点数">
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item name="kanbanId" label="状态">
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
