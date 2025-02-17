import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Logo and Title */}
          <div className="col-md-4 mb-4">
            <img
              src={Logo}
              alt="E-Shawn"
              className="img-fluid rounded mx-auto  mb-3"
              style={{ width: "100px", height: "90px" }}
            />
            <h5 className="fw-bold text-uppercase">E-Shawn</h5>
            <p className="text-muted small">
              Your one-stop destination for all your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
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

          {/* Social Media */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-light">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-light">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-light">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top pt-3">
          <p className="mb-0 small">
            &copy; {new Date().getFullYear()} SmokeyShawn. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
