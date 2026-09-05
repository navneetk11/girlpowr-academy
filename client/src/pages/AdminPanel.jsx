import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContent'

function AdminPanel() {
  const { token } = useContext(AuthContext)
  const [pending, setPending] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/pending', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPending(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load pending students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPending()
  }, [])

  const handleApprove = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPending(pending.filter((u) => u._id !== userId))
    } catch (err) {
      setError(err.response?.data?.message || 'Could not approve student')
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pending Approvals</h2>
      {error && <p style={styles.error}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : pending.length === 0 ? (
        <p>No pending students 🎉</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Date of Birth</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {pending.map((u) => (
              <tr key={u._id}>
                <td style={styles.td}>{u.fullName}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.phone || '-'}</td>
                <td style={styles.td}>
                  {u.dateOfBirth ? new Date(u.dateOfBirth).toLocaleDateString() : '-'}
                </td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => handleApprove(u._id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    color: '#D4537E',
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '2px solid #eee',
    fontSize: '13px',
    color: '#555',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '14px',
  },
  button: {
    padding: '6px 16px',
    backgroundColor: '#D4537E',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  error: {
    color: '#E24B4A',
    fontSize: '13px',
    marginBottom: '1rem',
  },
}

export default AdminPanel
