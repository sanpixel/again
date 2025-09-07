import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import AuthCallback from './components/AuthCallback';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
