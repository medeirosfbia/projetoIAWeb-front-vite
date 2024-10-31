import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <ToastContainer> */}
            <Routes>
            <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path='/home' element={<Home />} />
            </Routes>
          {/* </ToastContainer> */}
        </BrowserRouter>
    
      </AuthProvider>
    </>
  )
}

export default App
