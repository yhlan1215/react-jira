import { Link, Routes, Route } from 'react-router-dom'
import { EpicScreen } from '../epic'
import { KanbanScreen } from '../kanban'

export const ProjectScreen = () => {
    return<div>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
            <Routes>
                <Route path='/kanban' element={<KanbanScreen/>}/>
                <Route path='/epic' element={<EpicScreen/>}/>
            </Routes>
        工程页面
    </div>
}