import styled from "styled-components"
import { useDebounce, useDocumentTitle } from '../../utils/index'
import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useProjects } from "../../utils/projects"
import { Button, Row, Typography } from "antd"
import { useUsers } from "../../utils/users"
import { ProjectMOdal } from "../projectModal"
import { useProjectModal } from "../../context/ProjectModalContext"
import { useUrlSearchParam } from "../../utils/url"

const Container = styled.div`
    padding: 3.2rem;
`

export const ProjectListScreen = () => {
    
    const { data: users } = useUsers()
    const { open } = useProjectModal()
    const [param, setParam] = useUrlSearchParam(['name','personId']) 
    const {  isLoading, error, data: projects } = useProjects(useDebounce(param,500))
    useDocumentTitle('项目列表')

    return<Container>
        <Row justify="space-between">
            <h1>项目列表</h1>
            <Button onClick={open}>新建项目</Button>
        </Row>
        <ProjectMOdal/>
        <SearchPanel param={param} setParam={setParam} users={users} />
        {error ? <Typography.Text>{error}</Typography.Text> : null}
        <List loading={isLoading} dataSource={projects} users={users} />
    </Container>
}