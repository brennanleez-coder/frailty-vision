import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Error404 = () => {
    return (
        <div className="max-w-7xl mx-auto mt-8 p-6 flex flex-col items-center justify-center bg-white">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
            >
                <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 text-lg mb-8">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Link
                        to="/"
                        className="px-6 py-3 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-600 transition-all duration-300"
                    >
                        Go Back Home
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-5 text-gray-500 text-sm"
            >
                <p>Frailty Vision © {new Date().getFullYear()} | All Rights Reserved</p>
            </motion.div>
        </div>
    );
};

export default Error404;
