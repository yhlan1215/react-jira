import styled from "styled-components";
import { Button, Dropdown, Menu } from "antd";
import softwareLogo from '../../assets/software-logo.svg'
import { useAuth } from '../../context'
import { resetRoute } from "../../utils";
import { ProjectPopover } from "../../screens";

const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled.div`
    display: flex;
    width: 30rem;
    justify-content: space-between;
`
const HeaderRight = styled.div``

const Img = styled.img`
    width: 18rem;
    color: agb(38,132,255);
`

export const Header = () => {
    
    const {logout,user} = useAuth()

    return  <Container>
    <HeaderLeft>
        <Button type="link" onClick={resetRoute}>
            <Img src={softwareLogo}/>
        </Button>
        <ProjectPopover/>
        <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
        <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
                <Button type={'link'} onClick={logout}>登出</Button>
            </Menu.Item>
        </Menu>}>
            <Button type={'link'} onClick={(e)=>e.preventDefault}>Hi,{user?.name}你猜</Button>
        </Dropdown>
    </HeaderRight>
</Container>
}