import { Input } from 'antd'
import { t } from 'i18next'
import { FilterBar, UserSelect, SearchContainer, TypeSelect } from '../../components'
import { useUrlSearchParam } from '../../utils/url'

export function SearchPanel() {
  const [param, setParam] = useUrlSearchParam(['name', 'processorId', 'type'])
  const reset = () => {
    setParam({ processorId: '', name: '', type: '' })
  }

  return (
    <FilterBar onClear={reset}>
      <SearchContainer label={t('kanban.taskname')}>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              name: e.target.value
            })
          }}
        />
      </SearchContainer>

      <SearchContainer label={t('common.processor')}>
        <UserSelect
          value={param.processorId || ''}
          firstOptionLabel={t('common.all')}
          onChange={(value) => {
            setParam({
              processorId: value
            })
          }}
        />
      </SearchContainer>

      <SearchContainer label={t('common.type')}>
        <TypeSelect
          firstOptionLabel={t('common.all')}
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
