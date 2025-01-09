import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact now"}>
      <div className="container my-5">
        {/* Page Heading */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="text-muted">
            We would love to hear from you! Reach out to us for any queries or
            support.
          </p>
        </div>

        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6">
            <h3 className="mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="col-md-6">
            <h3 className="mb-4">Our Contact Information</h3>
            <p>
              Have questions? Reach us directly using the details below or fill
              out the contact form.
            </p>
            <ul className="list-unstyled">
              <li className="mb-3">
                <strong>Email:</strong>{" "}
                <Link to="/contact" className="text-primary">
                  support@e-shawn.com
                </Link>
              </li>
              <li className="mb-3">
                <strong>Phone:</strong> <span>+1 234 567 890</span>
              </li>
              <li className="mb-3">
                <strong>Address:</strong> <br />
                123 E-Shawn Street, Tech City, CA 12345
              </li>
            </ul>

            {/* Social Media Links */}
            <h5>Follow Us</h5>
            <div>
              <Link to="#" className="text-primary me-3">
                <i className="bi bi-facebook"></i> Facebook
              </Link>
              <Link to="#" className="text-info me-3">
                <i className="bi bi-twitter"></i> Twitter
              </Link>
              <Link to="#" className="text-danger">
                <i className="bi bi-instagram"></i> Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
