import { Select } from 'antd'
import { useSetting } from '../context'

export function UserSelect({ value, onChange, firstOptionLabel }) {
  const { users } = useSetting()

  return (
    <Select value={value} onChange={onChange}>
      {firstOptionLabel
        ? (
          <Select.Option
            value=""
            style={{ color: 'lightgray', fontStyle: 'italic' }}
          >
            {firstOptionLabel}
          </Select.Option>
        ) : null}
      {users?.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.name}
        </Select.Option>
      ))}
    </Select>
  )
}
