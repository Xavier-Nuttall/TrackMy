import React from "react";
import '../App.css';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";

function LoginPage({ isOpen, setUserSession, userSession, setLoggedIn }) {
  const { instance } = useMsal();
  function loginPopup() {
    instance.loginPopup(loginRequest).then(response => {
      fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: response.accessToken }),
      }).then(response => {
        response.json().then(data => {
          localStorage.setItem('userSession', JSON.stringify(data));
          setUserSession(data);
          setLoggedIn(true);
        });
      });
    }).catch(e => {
      console.log(e);
    });
  }

  function logout() {
    setUserSession({});
    localStorage.removeItem('userSession');
    fetch('http://localhost:3001/api/users/session', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_token: userSession.session_token }),
    });
    setLoggedIn(false);
  }

  function signedIn() {
    return userSession.session_token !== undefined;
  }

  return (
    <main className={`${isOpen ? '' : 'open'}`}>
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <button className="sso-button outlook" onClick={() => { signedIn() ? logout() : loginPopup() }}>
            <img src="/outlook.png" alt="Outlook Icon" className="sso-icon" />
            {signedIn() ? <span>Sign Out</span> : <span>Sign in with Outlook</span>}
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;