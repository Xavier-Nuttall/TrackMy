import React from "react";

function LoginPage() {
    return (
      <main>
        <div className="grid-contain">
          <div id="login-panel">
            <fieldset>
              <legend>Log In</legend>
              <form>
                <label>User:</label><input type="text" name="user" />
                <label>Pass:</label><input type="password" name="pass" />
                <input type="submit" value="Sign In" />
              </form>
            </fieldset>
          </div>
          <div id="register-panel">
            <fieldset>
              <legend>Register for a New Account</legend>
              <form>
                <label>Email:</label><input type="email" name="email" />
                <label>User:</label><input type="text" name="user" />
                <label>First Name:</label><input type="text" name="firstName" />
                <label>Last Name:</label><input type="text" name="lastName" />
                <label>Other Names:</label><input type="text" name="otherNames" />
                <label>Pass:</label><input type="password" name="pass" />
                <input type="submit" value="Sign Up" />
              </form>
            </fieldset>
          </div>
        </div>
      </main>
    );
  }

export default LoginPage;