import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98],
        delay: 0.2,
      }}
      className="fixed w-full backdrop-blur-md bg-white/80 shadow-sm z-50"
    >
      {/* Rest of your JSX remains the same */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.04, 0.62, 0.23, 0.98],
            delay: 0.4,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent"
          >
            YourLogo
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + index * 0.1,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.8,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-2 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <Link to="/login">Login</Link>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="md:hidden"
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-purple-600 hover:text-purple-500 transition-colors duration-200"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-purple-100"
          >
            <div className="container mx-auto py-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="block px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: navLinks.length * 0.1 }}
                className="px-6 py-3 flex justify-center"
              >
                <Link
                  to="/login"
                  className="inline-block bg-gradient-to-r from-purple-600 to-purple-400 px-8 py-2 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-shadow duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
