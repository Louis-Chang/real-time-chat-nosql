import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatApp from './components/ChatApp';

function App() {
  return (
    <div className="container-fluid py-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow rounded">
            <div className="card-body p-0">
              <ChatApp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
