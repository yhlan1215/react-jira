import { Input } from 'antd'
import { t } from 'i18next'
import { FilterBar, UserSelect, SearchContainer } from '../../components'
import { useUrlSearchParam } from '../../utils/url'

export function SearchPanel() {
  const [param, setParam] = useUrlSearchParam(['name', 'personId'])
  const reset = () => {
    setParam({ name: '', personId: '' })
  }

  return (
    <FilterBar onClear={reset}>
      <SearchContainer label={t('projectList.projectName')}>
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
          value={param.personId || ''}
          firstOptionLabel={t('common.all')}
          onChange={(value) => {
            setParam({
              personId: value
            })
          }}
        />
      </SearchContainer>
    </FilterBar>
  )
}
