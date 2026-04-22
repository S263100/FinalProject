import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white p-4 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-primary font-serif tracking-tight">Gym-Track</h1>
            <div>
                <Link to="/" className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200">Home</Link>
                <Link to="/login" className="ml-6 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200">Login</Link>
                <Link to="/register" className="ml-6 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200">Register</Link>
                <Link to="/playlists" className="ml-6 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200">Playlists</Link>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar