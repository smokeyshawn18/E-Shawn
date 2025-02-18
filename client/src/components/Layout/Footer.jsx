import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";
import Logo from "../../assets/Logo.png"; // Update path as needed

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4 text-center text-md-start align-items-center">
          {/* Logo & Description */}
          <div className="col-md-4">
            <img
              src={Logo}
              alt="E-Shawn Logo"
              className="img-fluid rounded mb-3"
              style={{ width: "120px", height: "100px" }}
            />
            <h5 className="fw-bold text-uppercase">E-Shawn</h5>
            <p className="text-light small">
              Your trusted platform for premium products & services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-light text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">Connect With Us</h5>
            <p className="small">Email: support@eshawn.com</p>
            <p className="small">Phone: +123 456 7890</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-white social-icon">
                <Facebook size={28} />
              </a>
              <a href="#" className="text-white social-icon">
                <Instagram size={28} />
              </a>
              <a href="#" className="text-white social-icon">
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top border-light pt-3">
          <p className="mb-0 small">
            &copy; {new Date().getFullYear()} SmokeyShawn. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
