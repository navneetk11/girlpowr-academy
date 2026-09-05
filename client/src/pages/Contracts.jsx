import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContent'

function Contracts() {
  const { token, studentId } = useContext(AuthContext)
  const navigate = useNavigate()
  const [checked, setChecked] = useState({
    rules: false,
    mediaRelease: false,
    contract: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const allChecked = checked.rules && checked.mediaRelease && checked.contract

  const handleToggle = (name) => {
    setChecked({ ...checked, [name]: !checked[name] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(
        'http://localhost:5000/api/contracts',
        { studentId, ...checked },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌟 Before you get started</h2>
        <p style={styles.subtitle}>Please review and confirm the following</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.checkboxRow}>
            <input
              type='checkbox'
              checked={checked.rules}
              onChange={() => handleToggle('rules')}
            />
            I have read and agree to the studio rules
          </label>
          <label style={styles.checkboxRow}>
            <input
              type='checkbox'
              checked={checked.mediaRelease}
              onChange={() => handleToggle('mediaRelease')}
            />
            I consent to the media release
          </label>
          <label style={styles.checkboxRow}>
            <input
              type='checkbox'
              checked={checked.contract}
              onChange={() => handleToggle('contract')}
            />
            I agree to the enrollment contract
          </label>

          <button style={styles.button} type='submit' disabled={!allChecked || loading}>
            {loading ? 'Submitting...' : 'Continue to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBEAF0',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '440px',
  },
  title: {
    color: '#D4537E',
    textAlign: 'center',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#555',
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#333',
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#D4537E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  error: {
    color: '#E24B4A',
    fontSize: '13px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
}

export default Contracts
