import './App.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Auth } from './FEATURES/AUTH/Auth'
import Sidebar from './LAYOUTS/Sidebar'
import FlowTasks from "./FEATURES/TASKS/ReactFlow"
import HomePage from "./PAGES/HomePage"
import ProjectsPage from './PAGES/ProjectsPage'
import {ToastContainer} from 'react-toastify'
import { TaskProvider } from './HOOKS/Tasks/TaskContext'
function App() {


  return (
    <Router>
      <TaskProvider>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/dashboard' element={<Sidebar/>}>
          <Route path='home' element={<HomePage/>}/>
          <Route path='tasks' element={<FlowTasks/>}/>
          <Route path='projects' element={<ProjectsPage/>}/>
        </Route>
      </Routes>
      </TaskProvider>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </Router>
  )
}

export default App
