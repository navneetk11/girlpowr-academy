import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [studentId, setStudentId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    const storedStudentId = localStorage.getItem('studentId')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      setStudentId(storedStudentId || null)
    }
    setLoading(false)
  }, [])

  const login = (userData, jwtToken, studentIdValue) => {
    localStorage.setItem('token', jwtToken)
    localStorage.setItem('user', JSON.stringify(userData))
    if (studentIdValue) {
      localStorage.setItem('studentId', studentIdValue)
    }
    setToken(jwtToken)
    setUser(userData)
    setStudentId(studentIdValue || null)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('studentId')
    setToken(null)
    setUser(null)
    setStudentId(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, studentId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}