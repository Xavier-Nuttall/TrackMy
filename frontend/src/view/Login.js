import React from "react";
import '../App.css';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";

function LoginPage({ isOpen }) {
  const { instance } = useMsal();
  function loginPopup() {
    instance.loginPopup(loginRequest).then(response => {
      console.log(response);
      fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: response.accessToken }),
      })


    })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <main className={`${isOpen ? '' : 'open'}`}>
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <button className="sso-button outlook" onClick={() => { loginPopup() }}>
            <img src="/outlook.png" alt="Outlook Icon" className="sso-icon" />
            <span>Sign in with Outlook</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;