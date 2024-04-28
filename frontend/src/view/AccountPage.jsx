import React from "react";

function AccountPage() {
    return (
      <main>
        <div className="general-panel">
          <h1>Welcome, [User]</h1>
          <fieldset>
            <legend>Edit Details</legend>
            <form>
              <label>Email:</label><input type="email" name="email" />
              <label>User:</label><input type="text" name="user" />
              <label>First Name:</label><input type="text" name="firstName" />
              <label>Last Name:</label><input type="text" name="lastName" />
              <label>Other Names:</label><input type="text" name="otherNames" />
              <label>Pass:</label><input type="password" name="pass" />
              <input type="submit" value="Submit Details" />
            </form>
          </fieldset>
          <button style={{ width: '100%', position: 'absolute', bottom: 0 }}>Log Out</button>
        </div>
      </main>
    );
  }
  
export default AccountPage;