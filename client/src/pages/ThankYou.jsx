import { Link } from 'react-router-dom'

function ThankYou() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Thank you for your interest in Girl Pow-R Academy!</h2>
        <p style={styles.message}>Dawn will be in touch with next steps shortly.</p>
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
    backgroundColor: '#FBEAF0',
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
  title: {
    color: '#D4537E',
    marginBottom: '1rem',
    fontSize: '1.3rem',
  },
  message: {
    color: '#555',
    fontSize: '14px',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
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

export default ThankYou