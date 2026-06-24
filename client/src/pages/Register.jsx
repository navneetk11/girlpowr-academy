import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'student'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData)
      navigate('/pending')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌟 Girl Pow-R Academy</h2>
        <h3 style={styles.subtitle}>Create your account</h3>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type='text'
            name='fullName'
            placeholder='Full name'
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type='email'
            name='email'
            placeholder='Email address'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type='tel'
            name='phone'
            placeholder='Phone number'
            value={formData.phone}
            onChange={handleChange}
          />
          <select
            style={styles.input}
            name='role'
            value={formData.role}
            onChange={handleChange}
          >
            <option value='student'>Student</option>
            <option value='parent'>Parent / Guardian</option>
          </select>

          <button style={styles.button} type='submit' disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={styles.link}>
          Already have an account? <Link to='/'>Login here</Link>
        </p>
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
    backgroundColor: '#fff0f5',
  },
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
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
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
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
  link: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '13px',
    color: '#555',
  }
}

export default Register