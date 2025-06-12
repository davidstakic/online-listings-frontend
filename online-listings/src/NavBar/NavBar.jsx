import { useAuth } from "../Login/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { logout, isLoggedIn, getUserInfo } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-primary text-white fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white" aria-current="page">
                Home
              </Link>
            </li>
          </ul>
          {isLoggedIn && (
            <span className="me-3 text-white">
              Welcome, {getUserInfo().sub}!
            </span>
          )}
          {!isLoggedIn && (
            <Link to="/login" className="btn btn-outline-light ms-2">
              Login
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/sign-up" className="btn btn-light ms-2">
              Sign Up
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/listing/create" className="btn btn-success ms-2">
              New Listing
            </Link>
          )}
          {isLoggedIn && (
            <button
              className="btn btn-danger ms-2"
              type="button"
              onClick={logout}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
