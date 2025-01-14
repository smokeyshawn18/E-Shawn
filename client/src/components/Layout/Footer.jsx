import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        background:
          "linear-gradient(135deg,rgb(31, 30, 30) 0%,rgb(66, 62, 62) 100%)",
        padding: "40px 0",
        color: "#fff",
      }}
    >
      <div className="container text-center">
        <img
          src={Logo}
          alt="E-Shawn"
          className="img-fluid rounded mx-auto d-block mb-3"
          style={{ width: "100px", height: "100px" }}
        />
        {/* Footer Title */}
        <h1
          className="text-white mb-3"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            letterSpacing: "2px",
          }}
        >
          All Rights Reserved &copy; E-Shawn.
        </h1>

        {/* Footer Links */}
        <p className="mt-3" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
          <Link to="/about" className="text-white mx-3 hover:text-yellow-300">
            About
          </Link>{" "}
          |
          <Link to="/contact" className="text-white mx-3 hover:text-yellow-300">
            Contact
          </Link>{" "}
          |
          <Link to="/policy" className="text-white mx-3 hover:text-yellow-300">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Footer Bottom Text */}
      <div
        className="text-center mt-4"
        style={{ fontSize: "1rem", fontWeight: "400" }}
      >
        <p>
          &copy; {new Date().getFullYear()} SmokeyShawn. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
