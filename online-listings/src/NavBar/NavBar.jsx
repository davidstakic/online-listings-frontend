function NavBar() {
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
              <a className="nav-link text-white" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
          <span className="me-3 text-white">Welcome, User!</span>
          <button className="btn btn-outline-light ms-2" type="button">
            Login
          </button>
          <button className="btn btn-light ms-2" type="button">
            Sign Up
          </button>
          <button className="btn btn-success ms-2" type="button">
            New Listing
          </button>
          <button className="btn btn-danger ms-2" type="button">
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
