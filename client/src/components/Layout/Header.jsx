import { NavLink, Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const cartItemCount = 0; // Replace with dynamic cart count

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white position-sticky top-0 z-3 shadow-sm ">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center text-black"
          >
            <FaBagShopping className="fs-2 me-2" />
            <span className="fs-4">e-Shawn</span>
          </Link>
          <ul className="navbar-nav mb-2 mb-lg-0 mx-5">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-black px-3 py-2">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link text-black px-3 py-2">
                Category
              </NavLink>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link text-black px-3 py-2"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link text-black px-3 py-2"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle text-black px-3 py-2"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul
                    className="dropdown-menu bg-white border-0"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item text-black"
                        to={
                          auth?.user?.role === 1
                            ? "/dashboard/admin" // Admin path
                            : "/dashboard/user" // User path
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => {
                          setAuth({
                            ...auth,
                            user: null,
                            token: null,
                          });
                          localStorage.removeItem("auth");
                          toast.success("Logout Successfully");
                        }}
                        to="/login"
                        className="dropdown-item text-black"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                to="/cart"
                className="nav-link text-black d-flex align-items-center px-3 py-2"
              >
                <FaBagShopping className="me-2" />
                Cart{" "}
                {cartItemCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-1">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
