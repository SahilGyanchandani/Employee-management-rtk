import './App.css'
import EmployeeListView from './components/employeeGetView'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import EmployeeFormView from './components/employeeFormView'


function App() {

  return (
    <>
      <h1>Redux-Toolkit Project</h1>
      <Router>
        <Routes>
          <Route path='/employee/:eId?' element={<EmployeeFormView />} />
          <Route path='/' element={<EmployeeListView />} />
          {/* <Route path='/edit/:eId' element={<EmployeeEditView />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
