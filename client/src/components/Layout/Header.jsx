import { NavLink, Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import SearchInput from "../forms/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";
import { useCart } from "../../context/Cart.jsx";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow position-sticky top-0 start-0 end-0 z-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo and Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="E-Shawn"
            className="img-fluid rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="fs-4 ms-2 fw-bold text-dark">e-Shawn</span>
        </Link>

        {/* Search Input */}
        <SearchInput />

        {/* Toggler for Mobile View */}
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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mx-2">
              <NavLink to="/" className="nav-link text-dark px-3 py-2">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown mx-2">
              <Link
                className="nav-link dropdown-toggle"
                to="/categories"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Auth Links */}
            {!auth.user ? (
              <>
                <li className="nav-item mx-2">
                  <NavLink
                    to="/register"
                    className="nav-link text-dark px-3 py-2"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/login" className="nav-link text-dark px-3 py-2">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown mx-2">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link dropdown-toggle px-3 py-2 text-primary ${
                      isActive ? "active" : ""
                    }`
                  }
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User className="me-2" size={20} />
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `dropdown-item${isActive ? " active" : ""}`
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
                        if (auth?.user?.email) {
                          localStorage.setItem(
                            `cart_${auth.user.email}`,
                            JSON.stringify(cart)
                          ); // Save cart before logout
                        }

                        setAuth({ user: null, token: null });
                        localStorage.removeItem("auth"); // Remove authentication
                        setCart([]); // Clear cart in state to prevent showing previous user's cart

                        toast.success("Logout Successfully");
                      }}
                      className="dropdown-item"
                      to="/login"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            {/* Cart */}
            <li className="nav-item mx-1">
              <Badge count={cart?.length} showZero className="fs-6 mt-2">
                <NavLink
                  to="/cart"
                  className="nav-link  d-flex align-items-center text-dark px-3 py-2"
                >
                  <FaBagShopping className="me-2" />
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
