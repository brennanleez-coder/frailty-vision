import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="relative bg-gray-100 rounded-3xl shadow-soft border border-white/30 w-full max-w-3xl mx-auto overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ maxHeight: "90vh" }}
          >

            <button
              className="absolute top-4 right-4 p-2 text-pastelPurple hover:text-opacity-80 focus:outline-none transition duration-300"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>


            <div
              className="overflow-y-auto p-6"
              style={{ maxHeight: "90vh" }} // Make the body scrollable if content is too large
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
