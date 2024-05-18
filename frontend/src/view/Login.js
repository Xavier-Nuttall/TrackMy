import React from "react";
import '../App.css';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import { callMsGraph } from "../graph";

function LoginPage({ isOpen }) {
  const { instance } = useMsal();
  function loginPopup() {
    instance.loginPopup(loginRequest).then(response => {
      console.log(response);
      callMsGraph(response.accessToken).then(secondResponse => {
        let firstName = secondResponse.givenName;
        let lastName = secondResponse.surname;
        let email = secondResponse.mail;
        let idToken = response.idToken;
        fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, email, idToken }),
        })


        console.log(secondResponse);
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
    <main className={`${isOpen ? '' : 'open'}`}>
      <div class="container">
        <div class="login-box">
          <h2>Login</h2>
          <button class="sso-button outlook" onClick={() => { loginPopup() }}>
            <img src="/outlook.png" alt="Outlook Icon" class="sso-icon" />
            <span>Sign in with Outlook</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;