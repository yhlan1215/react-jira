import { Rate } from 'antd'

export function Pin({ checkd, onCheckdChange, ...restProps }) {
  return (
    <Rate
      count={1}
      value={checkd ? 1 : 0}
      onChange={(num) => onCheckdChange(!!num)}
      {...restProps}
    />
  )
}
