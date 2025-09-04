import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import logo from '../logo.svg';

export default function Auth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) console.error('Error:', error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error:', error);
  };

  if (session) {
    return (
      <>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome, {session.user.email}!</p>
        <button onClick={signOut}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to <code>again</code> - Supabase OAuth Demo
      </p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>
        <a
          className="App-link"
          href="https://supabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Supabase
        </a>
      </p>
    </>
  );
}
