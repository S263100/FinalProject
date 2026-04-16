import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const App = () => {
  return ( 
  <div>

    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </div>
  )
};

export default App;
