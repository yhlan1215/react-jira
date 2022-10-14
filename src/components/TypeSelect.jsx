import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

export function TypeSelect({ value, onChange, firstOptionLabel }) {
  const { t } = useTranslation()
  return (
    <Select
      value={value}
      onChange={onChange}
    >
      {firstOptionLabel
        ? (
          <Select.Option value="" style={{ color: 'lightgray', fontStyle: 'italic' }}>
            {firstOptionLabel}
          </Select.Option>
        ) : null}
      <Select.Option value="task">{t('kanban.task')}</Select.Option>
      <Select.Option value="bug">Bug</Select.Option>
    </Select>
  )
}
