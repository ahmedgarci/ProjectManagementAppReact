import './App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Auth } from './FEATURES/AUTH/Auth'
import Sidebar from './LAYOUTS/Sidebar'
import FlowTasks from "./FEATURES/TASKS/ReactFlow"
import HomePage from "./PAGES/HomePage"
import ProjectsPage from './PAGES/ProjectPage'
import {ToastContainer} from 'react-toastify'
import { TaskProvider } from './HOOKS/Tasks/TaskContext'
import AcceptProjectInvitationPage from './PAGES/AcceptProjectInvitePage'
function App() {


  return (
    <Router>
      <TaskProvider>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/dashboard' element={<Sidebar/>}>
          <Route path='home' element={<HomePage/>}/>
          <Route path='tasks/:projectId?' element={<FlowTasks/>}/>
          <Route path='projects' element={<ProjectsPage/>}/>
        </Route>
        <Route path='contributors/acceptinvite/:code' element={<AcceptProjectInvitationPage/>} />
      </Routes>
      </TaskProvider>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </Router>
  )
}

export default App
