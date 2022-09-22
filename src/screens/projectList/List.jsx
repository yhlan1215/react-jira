import { Dropdown, Menu, Table, Button } from "antd"
import { Link } from 'react-router-dom'
import { useProjectModal } from "../../context"
import { useDeleteProject } from "../../utils/projects"

export const List = ({users,...props}) => {

    const { openOriginal } = useProjectModal()
    const { deleteProject } = useDeleteProject()
        

    return(
        <div>
            <Table
            {...props} 
            columns={[
                {
                    key:'name',
                    title:'名称',
                    dataIndex:'name',
                    render:(value,project)=>{
                        return<Link to={project._id} >{value}</Link>
                    }
                },
                {
                    key:'organization',
                    title:'部门',
                    dataIndex:'organization'
                },
                {
                    key:'personId',
                    title:'负责人',
                    render:(name,project)=>
                        <div>{users?.find((user)=>user._id === project.personId)?.name || '未知'}</div>
                },
                {
                    key:'_id',
                    title:'action',
                    render:(value,project)=>{return <Dropdown overlay={<Menu>
                        <Menu.Item key={'edit'}><Button type="link" onClick={ ()=>{openOriginal(project._id)} }>编辑</Button></Menu.Item>
                        <Menu.Item key={'delete'}><Button type="link" onClick={()=>{deleteProject(value)}}>删除</Button></Menu.Item>
                    </Menu>}>
                        <Button type="link">...</Button>
                    </Dropdown>}
                }
            ]} 
        />
    </div>
    )
}