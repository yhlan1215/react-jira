import { Input } from 'antd'
import { FilterBar, UserSelect, SearchContainer, TypeSelect } from '../../components'
import { useUrlSearchParam } from '../../utils/url'

export function SearchPanel() {
  const [param, setParam] = useUrlSearchParam(['name', 'processorId', 'type'])
  const reset = () => {
    setParam({ processorId: '', name: '', type: '' })
  }

  return (
    <FilterBar onClear={reset}>
      <SearchContainer label="任务">
        <Input
          placeholder="任务名"
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              name: e.target.value
            })
          }}
        />
      </SearchContainer>

      <SearchContainer label="负责人">
        <UserSelect
          value={param.processorId || ''}
          firstOptionLabel="所有"
          onChange={(value) => {
            setParam({
              processorId: value
            })
          }}
        />
      </SearchContainer>

      <SearchContainer label="类型">
        <TypeSelect
          firstOptionLabel="所有"
          value={param.type || ''}
          onChange={(value) => {
            setParam({
              type: value
            })
          }}
        />
      </SearchContainer>
    </FilterBar>
  )
}
