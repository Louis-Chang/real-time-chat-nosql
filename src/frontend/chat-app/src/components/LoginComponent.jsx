import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import axios from 'axios';
import { setUser } from '../features/userSlice';

function LoginComponent({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
      dispatch(setUser(user));
      navigate('/chat'); 
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="card shadow rounded">
      <div className="card-body">
        <h4 className="card-title">Login</h4>
        <form>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
          <p className="mt-3 text-center">
            Don't have an account? <button className="btn btn-link p-0" onClick={toggleForm} style={{ verticalAlign: 'baseline', border: 'none', padding: 0, backgroundColor: 'transparent', color: 'blue', textDecoration: 'underline' }}>Register here</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
