import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For smooth transitions
import { useLocation, Link } from "react-router-dom"; // Import necessary hooks from react-router-dom

const headers = [
  {
    name: "Frailty Test",
    href: "/frailty-test",
  },
  {
    name: "Track Progress",
    href: "/track-progress",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Privacy",
    href: "/privacy",
  },
  {
    name: "About",
    href: "/about",
  },

];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation(); // Get current route

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle the mobile menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`p-6 w-full sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/30 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastelPurple to-pink-500"
        >
          Frailty Vision
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {headers.map((header, index) => (
              <li key={index}>
                <motion.div
                  className={`relative font-semibold transition-colors duration-300 ${location.pathname === header.href
                      ? "text-pastelPurple"
                      : "text-gray-600 hover:text-pastelPurple"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={header.href}>
                    {header.name}
                  </Link>

                  {location.pathname === header.href && (
                    <motion.span
                      className="absolute bottom-0 left-0 h-1 bg-pastelPurple"
                      layoutId="header-underline"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  )}
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-pastelPurple hover:text-pink-500 focus:outline-none"
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/90 backdrop-blur-md shadow-soft mt-2 p-4 rounded-lg"
        >
          <ul className="flex flex-col space-y-4">
            {headers.map((header, index) => (
              <li key={index}>
                <Link
                  to={header.href}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu after navigation
                  className={`font-semibold transition-colors duration-300 ${location.pathname === header.href
                      ? "text-pastelPurple"
                      : "text-gray-600 hover:text-pastelPurple"
                    }`}
                >
                  {header.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Header;
