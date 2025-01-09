import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";

const HomePage = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Home - E-commerce App">
      <div className="container mt-4">
        <h1>HomePage</h1>
        {auth?.user ? (
          <div>
            <h3>User Data:</h3>
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "15px",
                borderRadius: "5px",
                overflow: "auto",
              }}
            >
              {JSON.stringify(auth, null, 2)}
            </pre>
          </div>
        ) : (
          <p>Please login to see your details</p>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
