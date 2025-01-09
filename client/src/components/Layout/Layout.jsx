import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({
  children,
  title = "E-Shawn - Shop Now", // Default title
  description = "E-Shawn is your one-stop destination for top-quality products and unbeatable prices", // Default description
  keywords = "E-Shawn, online shopping, best deals, top products, e-commerce site", // Default keywords
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title ? `${title} | E-Shawn` : "E-Shawn | Your Ultimate Shopping Destination"}
        </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="E-Shawn Team" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};

export default Layout;
