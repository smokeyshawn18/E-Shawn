import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DynamicText = () => {
  const names = ["ShopMore", "BuySmart", "QuickBuy", "BestMart"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % names.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    initial: { opacity: 0, x: 20 }, // Start from the right
    animate: { opacity: 1, x: 0 }, // Slide in
    exit: { opacity: 0, x: -20 }, // Slide out to the left
  };

  return (
    <h1 className="text-center fw-bold text-success mb-5 fs-2">
      Welcome to E-Shawn{" "}
      <span
        style={{
          display: "flex",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "120px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            className="text-primary fw-bold"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ position: "absolute" }}
          >
            {names[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
};

export default DynamicText;
