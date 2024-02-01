import './App.css'
import EmployeeAddView from './components/employeeAddView'
import EmployeeEditView from './components/employeeEditView'
import EmployeeListView from './components/employeeGetView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <>
      <h1>Redux-Toolkit Project</h1>
      <Router>
        <Routes>
          <Route path='/add' element={<EmployeeAddView />} />
          <Route path='/' element={<EmployeeListView />} />
          <Route path='/edit/:eId' element={<EmployeeEditView />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
