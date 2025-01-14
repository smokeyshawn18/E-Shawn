import { NavLink, Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";
import { User } from "lucide-react"; // Import the User icon

const Header = () => {
  const [auth, setAuth] = useAuth();
  const cartItemCount = 0; // Replace with dynamic cart count

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white position-sticky top-0 start-0 end-0 z-3 shadow-sm">
      <div className="container-fluid mx-auto">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="E-Shawn"
            className="img-fluid rounded"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="fs-4 ms-2 text-black">e-Shawn</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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

            {/* Conditionally render Register and Login links */}
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
                {/* Dropdown for logged-in users */}
                <li className="nav-item dropdown">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link dropdown-toggle text-primary px-3 py-2${
                        isActive ? "" : ""
                      }`
                    }
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User className="me-2" size={20} />{" "}
                    {/* Add Lucide User icon */}
                    {auth?.user?.name}
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `dropdown-item text-black${isActive ? "" : ""}`
                        }
                        to={
                          auth?.user?.role === 1
                            ? "/dashboard/admin"
                            : "/dashboard/user"
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => {
                          setAuth({ ...auth, user: null, token: null });
                          localStorage.removeItem("auth");
                          toast.success("Logout Successfully");
                        }}
                        className={({ isActive }) =>
                          `dropdown-item text-black${isActive ? "" : ""}`
                        }
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {/* Cart */}
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
