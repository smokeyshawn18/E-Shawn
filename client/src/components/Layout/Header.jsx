import { NavLink, Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";
import { User } from "lucide-react"; // Import the User icon
import SearchInput from "../forms/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";

const Header = () => {
  const categories = useCategory();

  const [auth, setAuth] = useAuth();
  const cartItemCount = 0; // Replace with dynamic cart count

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white position-sticky top-0 start-0 end-0 z-3 shadow-lg">
      <div className="container-fluid mx-auto m-2">
        {/* Logo and Brand Name */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="E-Shawn"
            className="img-fluid rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="fs-4 ms-2 text-black fw-bold">e-Shawn</span>
        </Link>

        {/* Search Input */}
        <SearchInput />

        {/* Toggler Button for Mobile */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Home Link */}
            <li className="nav-item mx-3">
              <NavLink to="/" className="nav-link text-black px-3 py-2">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    {" "}
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Conditional Rendering for Register and Login Links */}
            {!auth.user ? (
              <>
                <li className="nav-item mx-3">
                  <NavLink
                    to="/register"
                    className="nav-link text-black px-3 py-2"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item mx-3">
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
                {/* User Dropdown Menu for Logged-in Users */}
                <li className="nav-item dropdown mx-3">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link dropdown-toggle text-primary px-3 py-2${
                        isActive ? " active" : ""
                      }`
                    }
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User className="me-2" size={20} /> {/* User Icon */}
                    {auth?.user?.name}
                  </NavLink>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `dropdown-item text-black${isActive ? " active" : ""}`
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
                          `dropdown-item text-black${isActive ? " active" : ""}`
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

            {/* Cart Link */}
            <li className="nav-item mx-3">
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
