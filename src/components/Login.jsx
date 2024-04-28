import React from "react";
import { signInWithGoogle, auth } from "./firebase";
import googleLoginLogo from "./google.png"; 

function Login() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "/notes";
    }
  });

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="google-login">
          <button onClick={signInWithGoogle}>
            <img src={googleLoginLogo} alt="Google Login" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;