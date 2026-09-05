import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContent'

function ProtectedRoute({ children, requireRole }) {
  const { token, user, loading } = useContext(AuthContext)

  if (loading) return <div>Loading...</div>
  if (!token) return <Navigate to='/' replace />
  if (requireRole && user?.role !== requireRole) return <Navigate to='/dashboard' replace />

  return children
}

export default ProtectedRoute