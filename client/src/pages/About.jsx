import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About - E-Shawn"}>
      {/* About Section */}
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="text-muted">
            Welcome to <span className="text-primary fw-bold">E-Shawn</span>,
            your one-stop destination for quality and excellence.
          </p>
        </div>

        <div className="row align-items-center mb-5">
          {/* About Content */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted">
              E-Shawn is dedicated to providing the best products and services
              to meet our customers needs. Our mission is to deliver excellence
              in every transaction and build trust with our valued clients.
            </p>
            <p className="text-muted">
              Established in 2024, we have quickly grown to become a trusted
              name in the industry through our commitment to innovation and
              customer satisfaction.
            </p>
          </div>
          {/* Image */}
          <div className="col-md-6 text-center">
            <img
              src="/assets/images/about-us.png"
              alt="About Us"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Meet Our Team</h2>
          <p className="text-muted">
            The driving force behind E-Shawn success.
          </p>
        </div>

        <div className="row text-center">
          {/* Team Member 1 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow">
              <img
                src="/assets/images/team-member1.png"
                alt="Team Member"
                className="card-img-top rounded"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">John Doe</h5>
                <p className="card-text text-muted">Founder & CEO</p>
              </div>
            </div>
          </div>
          {/* Team Member 2 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow">
              <img
                src="/assets/images/team-member2.png"
                alt="Team Member"
                className="card-img-top rounded"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Jane Smith</h5>
                <p className="card-text text-muted">Head of Operations</p>
              </div>
            </div>
          </div>
          {/* Team Member 3 */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow">
              <img
                src="/assets/images/team-member3.png"
                alt="Team Member"
                className="card-img-top rounded"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Mike Johnson</h5>
                <p className="card-text text-muted">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
