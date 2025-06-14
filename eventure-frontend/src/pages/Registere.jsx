import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import Loading from '../components/Loading';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/signup', { email, password });
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Error registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="login-container">
      <h2 className="login-title">Register</h2>
      <form className="login-form" onSubmit={handleSubmit} aria-label="Registration Form">
  <label htmlFor="reg-email">Email</label>
  <input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

  <label htmlFor="reg-password">Password</label>
  <input id="reg-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

  <button type="submit">Register</button>
</form>
{error && <p className="login-error" role="alert">{error}</p>}

      <p className="login-link">
        Already signed up? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
