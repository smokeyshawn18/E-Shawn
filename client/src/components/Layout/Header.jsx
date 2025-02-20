import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../context/Auth.jsx";
import toast from "react-hot-toast";
import { User, ShoppingCart } from "lucide-react"; // Importing icons from Lucide
import SearchInput from "../forms/SearchInput.jsx";
import useCategory from "../../hooks/useCategory.jsx";
import { useCart } from "../../context/Cart.jsx";
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const categories = useCategory();
  const [auth, setAuth] = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm position-sticky top-0 start-0 end-0 z-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={Logo}
            alt="E-Shawn"
            className="img-fluid rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
          <span className="fs-4 ms-2 fw-bold text-dark">E-Shawn</span>
        </Link>

        {/* Search Input */}
        <div className="d-none d-lg-block w-50">
          <SearchInput />
        </div>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler border-0"
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
          className="collapse navbar-collapse justify-content-end mt-3 mt-lg-0"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            {/* Home */}
            <li className="nav-item mx-2">
              <NavLink
                to="/"
                className="nav-link text-dark px-3 py-2 d-flex align-items-center"
              >
                Home
              </NavLink>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown mx-2">
              <Link
                className="nav-link dropdown-toggle px-3 py-2 text-dark d-flex align-items-center"
                to="/categories"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu shadow-sm">
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
                {/* Register */}
                <li className="nav-item mx-2">
                  <NavLink
                    to="/register"
                    className="nav-link text-dark px-3 py-2 btn btn-outline-info rounded-pill"
                  >
                    Register
                  </NavLink>
                </li>

                {/* Login */}
                <li className="nav-item mx-2">
                  <NavLink
                    to="/login"
                    className="nav-link text-dark px-3 py-2 btn btn-info rounded-pill text-light"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* User Name */}
                <li className="nav-item mx-2 d-flex align-items-center">
                  <User size={20} className="me-2 text-dark" />
                  <span>{auth?.user?.name}</span>
                </li>
                {/* Dashboard */}
                <li className="nav-item mx-2">
                  <NavLink
                    to={
                      auth?.user?.role === 1
                        ? "/dashboard/admin"
                        : "/dashboard/user"
                    }
                    className="nav-link text-dark px-3 py-2 btn btn-warning rounded-pill d-flex align-items-center"
                  >
                    Dashboard
                  </NavLink>
                </li>
                {/* Logout */}
                <li className="nav-item mx-2 mb-1">
                  <button
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
                    className="btn btn-danger rounded-pill text-light px-4 py-1 mb-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Cart */}
            <li className="nav-item mx-2">
              <Badge count={cart?.length} showZero offset={[10, -5]}>
                <NavLink
                  to="/cart"
                  className="nav-link d-flex align-items-center mb-2 text-dark px-4 py-1 btn rounded-pill"
                >
                  <ShoppingCart size={20} className="me-2" />{" "}
                  <span className="text-dark ">Cart</span>
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="d-lg-none p-3 w-100">
        <SearchInput />
      </div>
    </nav>
  );
};

export default Header;
