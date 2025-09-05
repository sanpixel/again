import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import AuthCallback from './components/AuthCallback';
import './App.css';

function App() {
  // Debug environment variables
  console.log('=== ENVIRONMENT DEBUG ===');
  console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
  console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY);
  console.log('REACT_APP_SITE_URL:', process.env.REACT_APP_SITE_URL);
  console.log('All process.env keys:', Object.keys(process.env).filter(k => k.startsWith('REACT_APP')));

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>Environment Debug</h2>
          <div style={{fontSize: '12px', textAlign: 'left', margin: '20px'}}>
            <p>REACT_APP_SUPABASE_URL: {process.env.REACT_APP_SUPABASE_URL || 'NOT SET'}</p>
            <p>REACT_APP_SUPABASE_ANON_KEY: {process.env.REACT_APP_SUPABASE_ANON_KEY || 'NOT SET'}</p>
            <p>REACT_APP_SITE_URL: {process.env.REACT_APP_SITE_URL || 'NOT SET'}</p>
            <p>
              <a href="/api/debug/env" target="_blank" style={{color: '#61dafb'}}>
                Check .env file content
              </a>
            </p>
          </div>
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
