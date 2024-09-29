import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from './components/LoginComponent';
import RegistrationComponent from './components/RegistrationComponent';
import ChatApp from './components/ChatApp';
import { restoreUser } from './features/userSlice';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  const AuthWrapper = ({ children }) => {
    return (
      <div className="container-fluid py-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow rounded">
              <div className="card-body p-0">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AuthWrapper>
            {currentUser ? <Navigate to="/chat" /> : <LoginComponent />}
          </AuthWrapper>
        } />
        <Route path="/register" element={
          <AuthWrapper>
            {currentUser ? <Navigate to="/chat" /> : <RegistrationComponent />}
          </AuthWrapper>
        } />
        <Route path="/chat" element={
          <AuthWrapper>
            {currentUser ? <ChatApp /> : <Navigate to="/login" />}
          </AuthWrapper>
        } />
        <Route path="/" element={<Navigate to={currentUser ? "/chat" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
