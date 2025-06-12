import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../service/UserService";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const phoneRegex = /^06\d{7,8}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    setUsername((u) => u.trim());
    setPhoneNumber((p) => p.trim());
    setPassword((p) => p.trim());

    if (username === "") {
      setUsernameError("Please enter your username.");
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (phoneNumber === "") {
      setPhoneNumberError("Please enter your phone number.");
      hasError = true;
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError(
        "Phone number must start with 06 and contain 9 or 10 digits."
      );
      hasError = true;
    } else {
      setPhoneNumberError(null);
    }

    if (password === "") {
      setPasswordError("Please enter your password.");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (!hasError) {
      try {
        await userService.signUp({ username, phoneNumber, password });
        setSignUpError(null);
        toast.success("You have successfuly registered.");
        navigate("/login");
      } catch (err) {
        if (err.status === 400) {
          setSignUpError("Username already taken. Please try another one.");
        } else {
          setSignUpError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 min-vw-100">
        <div className="card shadow p-4 col-md-3">
          <h1 className="text-center mb-4">Sign Up</h1>
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
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className={`form-control ${
                  phoneNumberError ? "is-invalid" : ""
                }`}
                id="phoneNumber"
                value={phoneNumber}
                placeholder="e.g. 0612345678"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {phoneNumberError && (
                <div className="invalid-feedback d-block">
                  {phoneNumberError}
                </div>
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
            {signUpError && (
              <div className="alert alert-danger" role="alert">
                {signUpError}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
