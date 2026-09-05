import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContent'

function Dashboard() {
  const { user, token, studentId, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProfile(res.data)
      } catch (err) {
        setError('Could not load profile')
      }
    }
    if (studentId) fetchProfile()
  }, [studentId, token])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (error) return <p>{error}</p>
  if (!profile) return <p>Loading dashboard...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {profile.fullName} 🎉</h2>
      {profile.program && <p>Program: {profile.program}</p>}
      {profile.city && <p>City: {profile.city}</p>}
      <p>Level: {profile.level}</p>
      <p>Audition Status: {profile.auditionStatus}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard