import { Link } from 'react-router-dom'

function PendingApproval() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>⏳</div>
        <h2 style={styles.title}>You're registered!</h2>
        <p style={styles.message}>
          Thank you for joining Girl Pow-R Academy. Your account is currently 
          pending approval from our admin team. You'll receive an email once 
          your account has been approved.
        </p>
        <p style={styles.sub}>Already approved?</p>
        <Link to='/'>
          <button style={styles.button}>Go to Login</button>
        </Link>
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
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  title: {
    color: '#D4537E',
    marginBottom: '1rem',
  },
  message: {
    color: '#555',
    fontSize: '14px',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },
  sub: {
    color: '#999',
    fontSize: '13px',
    marginBottom: '0.75rem',
  },
  button: {
    padding: '10px 30px',
    backgroundColor: '#D4537E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  }
}

export default PendingApproval