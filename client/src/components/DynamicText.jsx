import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Rashmika from "../assets/ras.jpg";
import Mixer from "../assets/juicer.jpg";
import Foden from "../assets/foden.jpg";
import R2 from "../assets/woment.jpg";
import Shoe from "../assets/shoes.jpg";
import Baggy from "../assets/baggy.jpg";

const DynamicText = () => {
  const names = [
    "ShopMore",
    "BuySmart",
    "QuickBuy",
    "BestMart",
    "SuperDeals",
    "MegaMart",
  ];
  const images = [Rashmika, Foden, R2, Baggy, Mixer, Shoe];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % names.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const imageVariants = {
    initial: { opacity: 0, x: 100 }, // Slide in from right
    animate: { opacity: 1, x: 0 }, // Center
    exit: { opacity: 0, x: -100 }, // Slide out to left
  };

  return (
    <div className="container text-center my-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-lg-6 col-md-12 text-md-center text-lg-start mb-2">
          <h1 className="fw-bold text-success fs-3 fs-lg-2">
            Welcome to E-Shawn{" "}
            <span className="text-primary fw-bold">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`text-${index}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {names[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Image Section */}
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div className="position-relative overflow-hidden rounded image-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={`image-${index}`}
                src={images[index]}
                alt={`Slide ${index + 1}`}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="img-fluid rounded shadow-lg"
                style={{
                  height: "100%",
                  objectFit: "cover",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicText;
