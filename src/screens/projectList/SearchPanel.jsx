import { Form, Input, Select } from "antd"

export const SearchPanel = ({param,setParam,users}) => {

    return<Form layout="inline" style={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input placeholder="项目名" type='text' value={param.name} onChange={(e)=>{setParam({
                ...param,
                name:e.target.value
            })}} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={(value)=>{setParam({
                ...param,
                personId:value
            })}}>
                <Select.Option value={''}>负责人</Select.Option >
                {
                    users?.map((user)=>
                        <Select.Option  key={user._id} value={user._id}>
                            {user.name}
                        </Select.Option >)
                }
            </Select>
        </Form.Item>
    </Form>
}