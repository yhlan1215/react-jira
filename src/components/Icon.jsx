import { BugTwoTone, CaretUpOutlined, CarryOutOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'

export function BugIcon() {
  return <BugTwoTone style={{ color: 'red' }} />
}
export function TaskIcon() {
  return <CarryOutOutlined style={{ color: 'green' }} />
}
export function HighIcon() {
  return <CaretUpOutlined style={{ color: 'darkRed' }} />
}
export function MediumIcon() {
  return <UpOutlined style={{ color: 'orange' }} />
}
export function LowIcon() {
  return <DownOutlined style={{ color: 'blue' }} />
}
