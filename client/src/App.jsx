import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PendingApproval from './pages/PendingApproval'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/pending' element={<PendingApproval />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App