import { Select } from 'antd'

export function TypeSelect({ value, onChange, firstOptionLabel }) {
  return (
    <Select
      value={value}
      onChange={onChange}
    >
      {firstOptionLabel ? <Select.Option value="" style={{ color: 'lightgray', fontStyle: 'italic' }}>{firstOptionLabel}</Select.Option> : null}
      <Select.Option value="task">任务</Select.Option>
      <Select.Option value="bug">Bug</Select.Option>
    </Select>
  )
}
