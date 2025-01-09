import Layout from "../components/Layout/Layout";
import { AlertCircle } from "lucide-react";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
        <AlertCircle size={64} className="text-danger mb-3" />
        <h1 className="display-4 fw-bold text-dark">404</h1>
        <p className="lead text-dark font-weight-bold">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="btn btn-primary mt-4 px-4 py-2 fw-semibold"
        >
          Go Back to Homepage
        </a>
      </div>
    </Layout>
  );
};

export default PageNotFound;