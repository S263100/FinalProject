import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PlaylistDashboardPage from './pages/PlaylistDashboardPage'
import PlaylistDetailsPage from './pages/PlaylistDetailsPage'
import CreatePlaylistPage from './pages/CreatePlaylistPage'

const App = () => {
  return ( 
  <div>

    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/playlists' element={<PlaylistDashboardPage />} />
      <Route path='/playlists/:id' element={<PlaylistDetailsPage />} />
      <Route path='/playlists/create' element={<CreatePlaylistPage />} />
    </Routes>
  </div>
  )
};

export default App;
