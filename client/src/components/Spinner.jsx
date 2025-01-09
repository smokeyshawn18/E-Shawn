import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    // When count reaches 0, navigate to the login page, passing current location as 'from' in state
    if (count === 0) {
      navigate("/login", {
        state: { from: location.pathname },  // Pass the pathname properly
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">Redirecting to you in {count} second(s)</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
