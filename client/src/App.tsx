import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import { Tasks } from './components/Tasks/Tasks'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
