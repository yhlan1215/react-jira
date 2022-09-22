import { Button, Popover } from "antd"
import { useProjectModal } from "../../context/ProjectModalContext"

export const ProjectPopover = ({setIsMadalOpen}) => {

    const { open } = useProjectModal()

    const content = 
        <Button type="link" onClick={open}>
            新建项目
        </Button>

    return<Popover content={content}>
        项目
    </Popover>
}