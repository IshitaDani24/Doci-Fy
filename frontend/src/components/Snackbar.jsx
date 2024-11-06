// Snackbar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Snackbar = ({ snackbarOpen, snackbarMessage, handleSnackbarClose }) => {
  return (
    <AnimatePresence>
      {snackbarOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-4 right-10 bg-green-500 text-white p-4 pl-5 pr-5 rounded-lg shadow-lg z-50"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {snackbarMessage}
          </motion.p>
          {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1 right-0 bg-transparent border-none text-white text-xl cursor-pointer"
            onClick={handleSnackbarClose}
          >
            &times;
          </motion.button> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
