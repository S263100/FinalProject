const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
      <h1 className="text-3xl font-bold flex items-center justify-center">Login</h1>

      <input type="text" placeholder="Username or Email" className="w-full p-2 mb-4 border border-gray-300 rounded" />

      <input type="password" placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded" />

      <button type="submit" className="w-full bg-primary text-gray-800 p-2 rounded hover:bg-primary-dark transition-colors duration-200">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;