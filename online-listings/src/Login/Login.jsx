import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    setUsername((u) => u.trim());
    setPassword((p) => p.trim());

    if (username === "") {
      setUsernameError("Please enter your username.");
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (password === "") {
      setPasswordError("Please enter your password");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (!hasError) {
      try {
        await login({ username, password });
        setLoginError(null);
        navigate("/");
      } catch (err) {
        if (err.status === 404) {
          setLoginError("User " + username + " not found.");
        } else if (err.status === 400) {
          setLoginError("Incorrect password. Please try again.");
        } else {
          setLoginError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 min-vw-100">
        <div className="card shadow p-4 col-md-3">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={`form-control ${usernameError ? "is-invalid" : ""}`}
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <div className="invalid-feedback d-block">{usernameError}</div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="invalid-feedback d-block">{passwordError}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Submit
            </button>
            {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
