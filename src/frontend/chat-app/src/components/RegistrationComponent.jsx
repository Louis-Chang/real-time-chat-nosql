import React, { useState } from 'react';
import axios from 'axios';

function RegistrationComponent({ toggleForm }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', { username, email, password });
      console.log('Registration successful', response.data);
      // Optionally redirect to login page or auto-login the user
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div className="card shadow rounded">
      <div className="card-body">
        <h4 className="card-title">Register</h4>
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
          <p className="mt-3 text-center">
            Already have an account? <button className="btn btn-link p-0"  style={{ verticalAlign: 'baseline', border: 'none', padding: 0, backgroundColor: 'transparent', color: 'blue', textDecoration: 'underline' }} onClick={toggleForm}>Login here</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationComponent;
