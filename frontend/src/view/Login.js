import React from "react";
import '../App.css';

function LoginPage({ isOpen }) {

  return (
    <main className={`${isOpen ? '' : 'open'}`}>
      <div class="container">
        <div class="login-box">
          <h2>Login</h2>
          <button class="sso-button outlook">
            <img src="/outlook.png" alt="Outlook Icon" class="sso-icon" />
            <span>Sign in with Outlook</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;